import base64
import io

from PIL import Image

from config import IMG_HEIGHT, IMG_WIDTH

def get_img_from_base64(base64_string):
    image_bytes = base64.b64decode(base64_string)
    
    img = Image.open(io.BytesIO(image_bytes))
    img = img.resize((IMG_HEIGHT, IMG_WIDTH))

    return img