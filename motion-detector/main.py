import cv2
import numpy as np
import pandas as pd 
import threading
import os
import time
from save_snapshot import save_snapshot_as_base64

import requests
import base64
from dotenv import load_dotenv
import os

video_path = os.path.join('.', 'input', 'tiger4.mp4')

cap = cv2.VideoCapture(video_path)

cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)

ret, start_frame = cap.read()

start_frame = cv2.cvtColor(start_frame, cv2.COLOR_BGR2GRAY)
start_frame = cv2.GaussianBlur(start_frame, (21,21),0)
alarm = False
alarm_mode = False  # variable to trigger an alarm on the button
alarm_counter = 0

def detection_events():
    # everything that happens when movement is noticed, in this function.    global alarm
    for _ in range(5):
        if not alarm_mode:
            break
        print("Movement noticed!")
        _, frame_to_send = cap.read()

        if frame_to_send is not None:
            frame_to_send = save_snapshot_as_base64(frame_to_send, directory='./output_photos')
            load_dotenv()
            api_key = os.getenv('API_KEY')

            body = {
                "imageBase64": frame_to_send
            }

            headers = {
                'x-api-key': api_key,
                'Content-Type': 'application/json'
            }

            url = os.getenv('ENDPOINT_URL')
            # url = 'https://api.yourservice.com/endpoint'

            response = requests.post(url, json=body, headers=headers)

            if response.status_code == 200:
                print('Success:', response.json())
            else:
                print('Error:', response.status_code, response.text)
                
            

            time.sleep(10)
    alarm = False


# MAIN LOOP
while True:
    try:
        ret, frame = cap.read()

        if not ret:
            print("Koniec filmu lub błąd odczytu.")
            break
        
        if alarm_mode:
            frame_bw = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            frame_bw = cv2.GaussianBlur(frame_bw, (5,5), 0)
            difference = cv2.absdiff(frame_bw, start_frame)
            threshold = cv2.threshold(difference, 25, 255, cv2.THRESH_BINARY)[1]
            start_frame = frame_bw
        
            if threshold.sum() > 500: 
            #value sets the "sensitivity" of motion detection - the lower it is, the more sensitive it is
                alarm_counter += 1
            else:
                if alarm_counter > 0:
                    alarm_counter -= 1

            cv2.imshow('Video Stream', threshold)
        else:
            cv2.imshow('Video Stream', frame)

        if alarm_counter > 20:
            if not alarm:
                alarm = True
                threading.Thread(target=detection_events).start()

        key_pressed = cv2.waitKey(30)
        if key_pressed == ord('t'):
            alarm_mode = not alarm_mode
            alarm_counter = 0

        
        if key_pressed == ord('q'):
            alarm_mode = False
            break
    except Exception as e:
        print(f"Wystąpił błąd: {e}")
        break

cap.release()
cv2.destroyAllWindows()
