import os
from config import DATA_PATH

def get_data_class_names():
    class_names = [f for f in os.listdir(DATA_PATH) if os.path.isdir(os.path.join(DATA_PATH, f))]
    class_names.sort()
    return class_names