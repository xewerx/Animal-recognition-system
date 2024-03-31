import csv
import argparse
import os

CLASSES_FILE = os.path.join("data", "oidv7-class-descriptions.csv")
IMAGES_FILE = os.path.join("data", "oidv7-train-annotations-human-imagelabels.csv")
IMAGES_IDS_SAVE_PATH = os.path.join("data", "image_ids.txt")

def find_class_id_by_name(name):
    with open(CLASSES_FILE, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[1] == name:
                return row[0]
    return None

def find_image_ids_by_class_id(class_id):
    rows = []
    limit = 1
    i = 0
    with open(IMAGES_FILE, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[2] == class_id and row[3] == "1.0":
                print(row)
                rows.append(row[0])
                i += 1
                if i > limit:
                    return rows
    return rows

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
    description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)

    parser.add_argument(
      'class_name',
      type=str,
      default=None,
      help='Class name of images to download')
        
    args = vars(parser.parse_args())

    class_id = find_class_id_by_name(args["class_name"])

    if not class_id:
        raise Exception("Class not found")

    image_ids = find_image_ids_by_class_id(class_id)

    with open(IMAGES_IDS_SAVE_PATH, "w") as file:
        for string in image_ids:
            file.write("train/" + string + "\n")