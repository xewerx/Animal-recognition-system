import base64
import io

import tensorflow as tf

from config import IMG_HEIGHT, IMG_WIDTH

def get_img_from_base64(base64_string):
    image_bytes = base64.b64decode(base64_string)
    image_stream = io.BytesIO(image_bytes)
    
    img = tf.keras.utils.load_img(
      image_stream, target_size=(IMG_HEIGHT, IMG_WIDTH)
    )

    return img