import os
import numpy as np
import tensorflow as tf
import boto3
import keras

from datetime import datetime

from config import CLASS_NAMES
from get_img_from_base64 import get_img_from_base64 # type: ignore

print("Keras version: ", keras.__version__)
print("Tensorflow version: ", tf.__version__)

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')

FRAME_DYNAMO_TABLE = os.environ["FRAME_DYNAMO_TABLE"]
FRAME_S3_BUCKET = os.environ["FRAME_S3_BUCKET"]

local_model_path = '/tmp/model.keras'
s3.download_file(FRAME_S3_BUCKET, 'model.keras', local_model_path)
print("MODEL DOWNLOADED")

model = keras.models.load_model(local_model_path)
print("MODEL LOADED")

def handler(event, _):
    print("Received event", event)

    records = event["Records"]

    for record in records:
    
        frame_id = record["messageAttributes"]["FrameId"]["stringValue"]

        image_base64 = get_image_from_s3_by_id(frame_id)

        img = get_img_from_base64(image_base64)
        
        img_array = keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch

        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])

        predicted_class = CLASS_NAMES[np.argmax(score)]
        prediction_confidence = 100 * np.max(score)

        print(
            "This image most likely belongs to {} with a {:.2f} percent confidence."
            .format(predicted_class, prediction_confidence)
            )

        save_prediction_to_dynamo(frame_id, predicted_class, str(prediction_confidence))

def get_image_from_s3_by_id(frame_id):
    response = s3.get_object(Bucket=FRAME_S3_BUCKET, Key=f'{frame_id}.txt')
    file_body = response['Body'].read().decode('utf-8')
    return file_body

def save_prediction_to_dynamo(frame_id, predicted_class, prediction_confidence):
    primary_key = {'id': {'S': frame_id}}

    current_datetime = datetime.now()
    iso_string = current_datetime.isoformat()

    update_values = {
        ':updatedAt': {'S': iso_string},
        ':processedAt': {'S': iso_string},
        ':predictedClass': {'S': predicted_class},
        ':predictionConfidence': {'N': prediction_confidence}
    }

    update_expression = 'SET processedAt = :processedAt, predictedClass = :predictedClass, predictionConfidence = :predictionConfidence, updatedAt = :updatedAt'

    dynamodb.update_item(
        TableName=FRAME_DYNAMO_TABLE,
        Key=primary_key,
        UpdateExpression=update_expression,
        ExpressionAttributeValues=update_values,
        ConditionExpression='attribute_exists(id)',
        ReturnValues='UPDATED_NEW'
    )