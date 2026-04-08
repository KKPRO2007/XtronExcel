import json
import os
import sqlite3
import tempfile
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parent
TEMP_DB_DIR = Path(tempfile.gettempdir()) / "gpt_excel"
TEMP_DB_DIR.mkdir(parents=True, exist_ok=True)
DEFAULT_DB_PATH = str(TEMP_DB_DIR / "gpt_excel.db")
LEGACY_DB_PATH = BASE_DIR / "gpt_excel.db"
ROOT_DB_PATH = REPO_ROOT / "gpt_excel.db"
DB_PATH = os.environ.get("GPT_EXCEL_DB", DEFAULT_DB_PATH)
ACTIVE_DB_PATH = DB_PATH
SCHEMA_SQL = """
    CREATE TABLE IF NOT EXISTS uploaded_files (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        filename    TEXT NOT NULL,
        file_path   TEXT NOT NULL,
        uploaded_at TEXT NOT NULL,
        row_count   INTEGER,
        col_count   INTEGER,
        columns     TEXT
    );

    CREATE TABLE IF NOT EXISTS analysis_results (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        file_id     INTEGER REFERENCES uploaded_files(id),
        task        TEXT NOT NULL,
        result_json TEXT NOT NULL,
        created_at  TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS generated_files (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        file_id      INTEGER REFERENCES uploaded_files(id),
        output_type  TEXT NOT NULL,
        output_path  TEXT NOT NULL,
        created_at   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS automation_logs (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        task       TEXT NOT NULL,
        status     TEXT NOT NULL,
        message    TEXT,
        ran_at     TEXT NOT NULL
    );
"""


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(ACTIVE_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _resolve_active_db_path() -> str:
    candidates = []
    for candidate in (DB_PATH, DEFAULT_DB_PATH):
        if candidate not in candidates:
            candidates.append(candidate)

    for candidate in candidates:
        try:
            Path(candidate).parent.mkdir(parents=True, exist_ok=True)
            conn = sqlite3.connect(candidate)
            cur = conn.cursor()
            cur.executescript(SCHEMA_SQL)
            conn.commit()
            conn.close()
            return candidate
        except sqlite3.Error:
            continue

    return DEFAULT_DB_PATH


def _list_tables(db_path: str) -> list[str]:
    if not os.path.exists(db_path):
        return []
    try:
        conn = sqlite3.connect(db_path)
        try:
            cur = conn.cursor()
            cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
            return [row[0] for row in cur.fetchall()]
        finally:
            conn.close()
    except sqlite3.Error:
        return []


def _migrate_legacy_db_if_needed() -> None:
    source_candidates = [str(ROOT_DB_PATH), str(LEGACY_DB_PATH)]

    target_conn = get_connection()
    try:
        target_cur = target_conn.cursor()
        target_cur.execute("SELECT COUNT(*) FROM uploaded_files")
        if target_cur.fetchone()[0] > 0:
            return

        for source_path in source_candidates:
            source_tables = _list_tables(source_path)
            if not source_tables:
                continue

            legacy_conn = sqlite3.connect(source_path)
            legacy_conn.row_factory = sqlite3.Row
            try:
                for table in ("uploaded_files", "analysis_results", "generated_files", "automation_logs"):
                    legacy_cur = legacy_conn.cursor()
                    legacy_cur.execute(f"SELECT * FROM {table}")
                    rows = [dict(row) for row in legacy_cur.fetchall()]
                    if not rows:
                        continue
                    columns = list(rows[0].keys())
                    placeholders = ", ".join(["?"] * len(columns))
                    quoted_columns = ", ".join(columns)
                    values = [tuple(row[column] for column in columns) for row in rows]
                    target_cur.executemany(
                        f"INSERT OR REPLACE INTO {table} ({quoted_columns}) VALUES ({placeholders})",
                        values,
                    )
                target_conn.commit()
                return
            finally:
                legacy_conn.close()
    finally:
        target_conn.close()


def init_db() -> None:
    global ACTIVE_DB_PATH
    ACTIVE_DB_PATH = _resolve_active_db_path()
    conn = get_connection()
    cur = conn.cursor()
    cur.executescript(SCHEMA_SQL)
    conn.commit()
    conn.close()
    _migrate_legacy_db_if_needed()


def _decode_row(row: sqlite3.Row | None) -> dict | None:
    if not row:
        return None
    data = dict(row)
    if "columns" in data and data["columns"]:
        try:
            data["columns"] = json.loads(data["columns"])
        except Exception:
            data["columns"] = []
    return data


def save_file_record(
    filename: str,
    file_path: str,
    row_count: int = 0,
    col_count: int = 0,
    columns: list | None = None,
) -> int:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO uploaded_files (filename, file_path, uploaded_at, row_count, col_count, columns)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            filename,
            file_path,
            datetime.now().isoformat(),
            row_count,
            col_count,
            json.dumps(columns or []),
        ),
    )
    file_id = cur.lastrowid
    conn.commit()
    conn.close()
    return file_id


def get_all_files() -> list:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM uploaded_files ORDER BY uploaded_at DESC")
    rows = [_decode_row(r) for r in cur.fetchall()]
    conn.close()
    return rows


def get_file_by_id(file_id: int) -> dict | None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM uploaded_files WHERE id = ?", (file_id,))
    row = cur.fetchone()
    conn.close()
    return _decode_row(row)


def save_analysis(file_id: int, task: str, result: dict) -> int:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO analysis_results (file_id, task, result_json, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (file_id, task, json.dumps(result), datetime.now().isoformat()),
    )
    row_id = cur.lastrowid
    conn.commit()
    conn.close()
    return row_id


def get_analysis_by_file(file_id: int) -> list:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM analysis_results WHERE file_id = ? ORDER BY created_at DESC",
        (file_id,),
    )
    rows = [dict(r) for r in cur.fetchall()]
    for row in rows:
        try:
            row["result_json"] = json.loads(row["result_json"])
        except Exception:
            pass
    conn.close()
    return rows


def save_generated_file(file_id: int, output_type: str, output_path: str) -> int:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO generated_files (file_id, output_type, output_path, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (file_id, output_type, output_path, datetime.now().isoformat()),
    )
    row_id = cur.lastrowid
    conn.commit()
    conn.close()
    return row_id


def get_generated_files(file_id: int) -> list:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM generated_files WHERE file_id = ? ORDER BY created_at DESC",
        (file_id,),
    )
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows


def log_automation(task: str, status: str, message: str = "") -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO automation_logs (task, status, message, ran_at)
        VALUES (?, ?, ?, ?)
        """,
        (task, status, message, datetime.now().isoformat()),
    )
    conn.commit()
    conn.close()


def get_automation_logs(limit: int = 50) -> list:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM automation_logs ORDER BY ran_at DESC LIMIT ?",
        (limit,),
    )
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows


def get_db_stats() -> dict:
    conn = get_connection()
    cur = conn.cursor()
    stats = {"db_path": ACTIVE_DB_PATH}
    for table in ("uploaded_files", "analysis_results", "generated_files", "automation_logs"):
        cur.execute(f"SELECT COUNT(*) FROM {table}")
        stats[table] = cur.fetchone()[0]
    conn.close()
    return stats


init_db()
