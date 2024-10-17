def load_dataset(file_path: str) -> None:
    """
    Load data from a file 
    """
    if file_path:
        with open(file_path, 'r') as file:
            data = file.read()
    else:
        raise ValueError('Please provide a file path or a URL')
    print("Data loaded successfully")
    return data

