import os
import sys
from analysis import analyze_data
from charts import create_chart
from report_generator import generate_report
from data_cleaning import clean_data
from excel_generator import generate_advanced_excel
from word_generator import generate_word_report
from ppt_generator import generate_ppt
from file_segmentation import get_file_info
from sqlite_storage import save_file_record, save_analysis, save_generated_file, log_automation


def run_all(file_path: str, output_dir: str = "offline_outputs"):
    if not os.path.exists(file_path):
        print(f"[Offline] File not found: {file_path}")
        return

    os.makedirs(output_dir, exist_ok=True)
    out = lambda name: os.path.join(output_dir, name)

    print(f"\n{'='*55}")
    print(f"  GPT EXCEL — Offline Runner v2.0")
    print(f"  File : {file_path}")
    print(f"  Out  : {output_dir}/")
    print(f"{'='*55}\n")

    file_id = save_file_record(os.path.basename(file_path), file_path)

    print("[1/8] File info ...")
    info = get_file_info(file_path)
    print(f"      {info.get('total_rows')} rows | {info.get('total_columns')} cols | {info.get('file_size_kb')} KB")

    print("\n[2/8] Analyzing data ...")
    analysis = analyze_data(file_path)
    save_analysis(file_id, "analyze", analysis)
    print(f"      Rows: {analysis['total_rows']} | Duplicates: {analysis['duplicate_rows']}")

    print("\n[3/8] Cleaning data ...")
    clean_path = out("cleaned_data.xlsx")
    msg = clean_data(file_path, output_path=clean_path)
    save_generated_file(file_id, "cleaned_excel", clean_path)
    print(f"      {msg}")

    print("\n[4/8] Generating chart ...")
    chart_path = out("chart.png")
    msg = create_chart(file_path, chart_type="auto", output_path=chart_path)
    save_generated_file(file_id, "chart", chart_path)
    log_automation("chart", "success", msg)
    print(f"      {msg}")

    print("\n[5/8] Generating text report ...")
    report_path = out("report.txt")
    msg = generate_report(file_path, output_path=report_path)
    save_generated_file(file_id, "report_txt", report_path)
    print(f"      {msg}")

    print("\n[6/8] Generating advanced Excel ...")
    excel_path = out("final_output.xlsx")
    msg = generate_advanced_excel(file_path, output_path=excel_path)
    save_generated_file(file_id, "advanced_excel", excel_path)
    print(f"      {msg}")

    print("\n[7/8] Generating Word document ...")
    word_path = out("output_report.docx")
    msg = generate_word_report(file_path, output_path=word_path)
    save_generated_file(file_id, "word_doc", word_path)
    print(f"      {msg}")

    print("\n[8/8] Generating PowerPoint ...")
    ppt_path = out("output_report.pptx")
    msg = generate_ppt(file_path, output_path=ppt_path)
    save_generated_file(file_id, "pptx", ppt_path)
    log_automation("ppt", "success", msg)
    print(f"      {msg}")

    print(f"\n{'='*55}")
    print("  All 8 tasks complete!")
    print(f"  Outputs saved in: {output_dir}/")
    print(f"  SQLite record ID: {file_id}")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage  : python run_offline.py <path_to_excel_file> [output_dir]")
        print("Example: python run_offline.py data.xlsx my_outputs")
    else:
        output_dir = sys.argv[2] if len(sys.argv) > 2 else "offline_outputs"
        run_all(sys.argv[1], output_dir)
