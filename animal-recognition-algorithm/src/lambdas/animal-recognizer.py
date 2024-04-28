import json

import numpy as np
import tensorflow as tf

from config import CLASS_NAMES
from get_img_from_base64 import get_img_from_base64 # type: ignore

def handler(event, _):
    print(event)

    if 'image' not in event:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing image')
        }
    
    image_base64 = event["image"]

    model = tf.keras.models.load_model('models/model.keras')

    img = get_img_from_base64(image_base64)
    
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(CLASS_NAMES[np.argmax(score)], 100 * np.max(score))
        )
    
    return {
        'statusCode': 200,
        'body': 'ok'
    }
