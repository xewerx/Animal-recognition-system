import os
import sys
import numpy as np
import tensorflow as tf

sys.path.append('../animal-recognition-algorithm')
from config import IMG_HEIGHT, IMG_WIDTH
from src.utils.get_data_class_names import get_data_class_names

def get_img(path):
     img = tf.keras.utils.load_img(
      path, target_size=(IMG_HEIGHT, IMG_WIDTH)
    )
     return img

def predict_image_class(path):
  model = tf.keras.models.load_model('models/model.keras')
  class_names = get_data_class_names()

  img = get_img(path)
  
  img_array = tf.keras.utils.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0) # Create a batch

  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  print(
      "{} is {} with a {:.2f}% confidence."
      .format(path, class_names[np.argmax(score)], 100 * np.max(score))
    )
  
  return class_names[np.argmax(score)]
  
main_directory = './data/test_images'

result = {
    'elephant': 0,
    'giraffe': 0,
    'lion': 0,
    'parrot': 0,
    'rhino': 0,
    'tiger': 0
}

for class_name in os.listdir(main_directory):
    subfolder = os.path.join(main_directory, class_name)
    
    print(subfolder)

    for image in os.listdir(subfolder):
        image_path = os.path.join(subfolder, image)
        predicted_class = predict_image_class(image_path)
        if predicted_class == class_name:
            result[class_name] += 1


print("\n\n\n")
print("RESULT: ", result)