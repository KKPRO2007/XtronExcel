import pandas as pd

def clean_data(file_path):

    df = pd.read_excel(file_path)

    df = df.drop_duplicates()
    df = df.fillna(method="ffill")

    df.to_excel("cleaned_data.xlsx", index=False)

    return "Data cleaned successfully"
