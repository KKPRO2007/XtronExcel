# -------- BASIC EXCEL GENERATION (optional demo) --------
# def create_excel():
#     data = {
#         "Name": ["Aman", "Riya", "Rahul", "Sneha"],
#         "Score": [85, 90, 78, 92]
#     }
#     df = pd.DataFrame(data)
#     df.to_excel("output.xlsx", index=False)
#     return "Excel file generated successfully"

import pandas as pd
 
 
def read_excel(file_path: str) -> list | dict:
    try:
        df = pd.read_excel(file_path)
        return df.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
 
 
def generate_advanced_excel(file_path: str, output_path: str = "final_output.xlsx") -> str:
    try:
        df = pd.read_excel(file_path)
 
        with pd.ExcelWriter(output_path, engine="xlsxwriter") as writer:
            df.to_excel(writer, sheet_name="Raw Data", index=False)
 
            summary = df.describe().round(2)
            summary.to_excel(writer, sheet_name="Summary")
 
            workbook = writer.book
            worksheet = writer.sheets["Raw Data"]
 
            header_format = workbook.add_format({
                "bold": True,
                "border": 1,
                "bg_color": "#4472C4",
                "font_color": "#FFFFFF",
            })
 
            for col_num, value in enumerate(df.columns.values):
                worksheet.write(0, col_num, value, header_format)
                worksheet.set_column(col_num, col_num, 20)
 
        return f"Advanced Excel generated: {output_path}"
 
    except Exception as e:
        return f"Error generating Excel: {str(e)}"
