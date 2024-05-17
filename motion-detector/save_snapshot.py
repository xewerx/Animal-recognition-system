import cv2
import base64
from datetime import datetime
import os

directory='./output_photos'

def save_snapshot_as_base64(image, directory):
    """
    Saves an image from OpenCV as a Base64 encoded JPEG file.

    Args:
        image: Image to save.
        directory (str): Path to the directory where the images are to be saved.
    Returns:
        str: Encoded image in Base64 format.
    """
    if image is None:
        raise ValueError("Obraz jest pusty.")
    
    if not os.path.exists(directory):
        os.makedirs(directory)

    current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    filename = f"{current_time}.jpg"

    cv2.imwrite(cv2.os.path.join(directory, filename), image)

    with open(cv2.os.path.join(directory, filename), "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    return encoded_image