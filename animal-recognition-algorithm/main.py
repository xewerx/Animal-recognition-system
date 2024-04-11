import numpy as np

import tensorflow as tf

from config import IMG_HEIGHT, IMG_WIDTH

class_names = ['lion', 'shark', 'tiger']

def predict_image_class():
  model = tf.keras.models.load_model('models/model.keras')

  img = tf.keras.utils.load_img(
      'data/test_images/shark.jpeg', target_size=(IMG_HEIGHT, IMG_WIDTH)
  )
  img_array = tf.keras.utils.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0) # Create a batch

  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  print(
      "This image most likely belongs to {} with a {:.2f} percent confidence."
      .format(class_names[np.argmax(score)], 100 * np.max(score))
)
  
predict_image_class()