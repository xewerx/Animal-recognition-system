import base64
import io
import numpy as np
import tensorflow as tf

from config import IMG_HEIGHT, IMG_WIDTH
from src.utils.get_data_class_names import get_data_class_names
from src.utils.get_img_from_base64 import get_img_from_base64

print(tf.__version__)

base64_tiger = ''

def get_img(path):
     img = tf.keras.utils.load_img(
      path, target_size=(IMG_HEIGHT, IMG_WIDTH)
    )
     return img

def predict_image_class():
  model = tf.keras.models.load_model('models/data_augmentation-32-64-128-dropout.keras')
  class_names = get_data_class_names()

  img1 = get_img_from_base64(base64_tiger)
  img2 = get_img('data/test_images2/tiger/2024-10-10_09-54-45.jpg')

    # Zdekodowanie Base64 do bajtów
  image_data = base64.b64decode(base64_tiger)

  # Użycie io.BytesIO do stworzenia strumienia bajtów
  image_stream = io.BytesIO(image_data)
  img3 = tf.keras.utils.load_img(
      image_stream, target_size=(IMG_HEIGHT, IMG_WIDTH)
    )
  
  print(img1.size, img2.size, img3.size)
  print(img1.mode, img2.mode, img3.mode)
  
  # Zamień obraz na listę pikseli
  img1_pixels = list(img1.getdata())
  img2_pixels = list(img2.getdata())
  img3_pixels = list(img3.getdata())
  print(len(img1_pixels))
  print(len(img2_pixels))
  print(len(img3_pixels))
  
  # for i in range(32400):
      # if img1_pixels[i] != img2_pixels[i]:
          # print(img1_pixels[i], img2_pixels[i])
  # Porównanie pikseli

  img_array = np.array(img1)
  img_array = tf.expand_dims(img_array, 0) # Create a batch
  
  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  print(
      "This image most likely belongs to {} with a {:.2f} percent confidence."
      .format(class_names[np.argmax(score)], 100 * np.max(score))
)
  
predict_image_class()