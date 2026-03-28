from analysis import analyze_data
from charts import create_chart
from report_generator import generate_report

FILE_PATH = "uploaded_file.xlsx"

print("Offline Processing Started...")

try:
    analyze_data(FILE_PATH)
    create_chart(FILE_PATH)
    generate_report(FILE_PATH)

    print("All tasks completed ✅")

except Exception as e:
    print("Error:", e)
