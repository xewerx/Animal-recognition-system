import cv2
import base64
from datetime import datetime

def save_snapshot_as_base64(image, directory='./output_photos'):
    """
    Zapisuje obraz z OpenCV jako plik JPEG zakodowany w Base64.

    Args:
        image: Obraz do zapisania.
        directory (str): Ścieżka do katalogu, gdzie mają być zapisane obrazy.
    Returns:
        str: Zakodowany obraz w formacie Base64.
    """
    # Pobierz aktualną datę i godzinę
    current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    # Utwórz nazwę pliku na podstawie daty i godziny
    filename = f"{current_time}.jpg"

    # # Zapisz obraz jako plik JPEG
    cv2.imwrite(cv2.os.path.join(directory, filename), image)

    # # Wczytaj zapisany obraz do kodowania Base64
    with open(cv2.os.path.join(directory, filename), "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    return encoded_image

'''
# Przykładowe użycie
# Wczytaj obraz

image = cv2.imread("example_image.jpg")

# Zapisz obraz jako plik JPEG zakodowany w Base64
encoded_image = save_snapshot_as_base64(image, directory='./')

print("Obraz zakodowany w Base64:")
print(encoded_image)

'''
