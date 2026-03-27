import pandas as pd

def generate_report(file_path):

    df = pd.read_excel(file_path)

    with pd.ExcelWriter("report.xlsx") as writer:
        df.to_excel(writer, sheet_name="Raw Data", index=False)
        df.describe().to_excel(writer, sheet_name="Summary")

    return "Report generated successfully"
