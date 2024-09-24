import cv2
import threading
import os
import time
import requests

from save_snapshot import save_snapshot_as_base64
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('API_KEY')
api_url = os.getenv('API_URL')
sensitivity = int(os.getenv('MOTION_SENSITIVITY'))

if (os.getenv('USE_RTP_STREAM') == 'true'):
    video_path = 'stream.sdp'

    # required settings for reading rtp stream
    os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "protocol_whitelist;file,rtp,udp"
else:
    video_path = os.path.join('.', 'input', 'tiger.mp4')

cap = cv2.VideoCapture(video_path)

cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_BUFFERSIZE, 3) 
cap.set(cv2.CAP_PROP_FPS, 15)

ret, start_frame = cap.read()

start_frame = cv2.cvtColor(start_frame, cv2.COLOR_BGR2GRAY)
start_frame = cv2.GaussianBlur(start_frame, (21,21),0)
alarm = False
alarm_mode = False # variable to trigger an alarm on the button
alarm_counter = 0

def on_movement_detected():
    for _ in range(5):
        if not alarm_mode:
            break

        print("Movement noticed!")
        _, frame_to_send = cap.read()

        if frame_to_send is not None:
            frame_to_send = save_snapshot_as_base64(frame_to_send, directory='./output_frames')

            body = {
                "imageBase64": frame_to_send
            }

            headers = {
                'x-api-key': api_key,
                'Content-Type': 'application/json'
            }

            response = requests.post(api_url, json=body, headers=headers)

            if response.status_code == 204:
                print('Frame sent to API succesfully')
            else:
                print('Error:', response.status_code, response.text)
                
            time.sleep(10)
    alarm = False

# MAIN LOOP
while True:
    try:
        ret, frame = cap.read()

        if not ret:
            print("Error reading file")
            break

        if alarm_mode:
            frame_bw = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            frame_bw = cv2.GaussianBlur(frame_bw, (5,5), 0)
            difference = cv2.absdiff(frame_bw, start_frame)
            threshold = cv2.threshold(difference, 25, 255, cv2.THRESH_BINARY)[1]
            start_frame = frame_bw
        
            # value sets the "sensitivity" of motion detection - the lower it is, the more sensitive it is
            if threshold.sum() > sensitivity: 
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
                threading.Thread(target=on_movement_detected).start()

        key_pressed = cv2.waitKey(30)
        if key_pressed == ord('t'):
            alarm_mode = not alarm_mode
            alarm_counter = 0

        
        if key_pressed == ord('q'):
            alarm_mode = False
            break

        cap.grab()

    except Exception as e:
        print(f"Error during reading stream: {e}")
        break

cap.release()
cv2.destroyAllWindows()