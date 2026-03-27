from charts import create_chart
from analysis import analyze_data
from report_generator import generate_report
from data_cleaning import clean_data

def process_prompt(prompt, file_path):

    prompt = prompt.lower()

    if "clean" in prompt:
        return clean_data(file_path)

    elif "chart" in prompt or "graph" in prompt:
        return create_chart(file_path)

    elif "summary" in prompt or "analyze" in prompt:
        return analyze_data(file_path)

    elif "report" in prompt:
        return generate_report(file_path)
    
    elif "pie" in prompt:
        return create_chart(file_path, "pie")
    
    elif "line" in prompt:
        return create_chart(file_path, "line")

    else:
        return "Sorry, I could not understand the task"
