import cv2
import numpy as np
import pandas as pd 
import threading
import winsound
import os
import time
from save_snapshot import save_snapshot_as_base64

import requests
import base64
from dotenv import load_dotenv
import os

video_path = os.path.join('.', 'input', 'tiger2.mp4')
source = 'input/input.mp4' # nie działa ta wersja

# Tworzenie obiektu kamery wideo, może być w nawiasie np (0,1,2,3 i przełączanie między nimi jeśli kamer/źródeł jest więcej)
#Jeśli źródłem jest film lokalny, podajemy bezpośrednio link do pliku
# cap = cv2.VideoCapture(video_path, cv2.CAP_DSHOW)
# cap = cv2.VideoCapture(video_path, cv2.CAP_IMAGES)

cap = cv2.VideoCapture(video_path)

#ustawienie obrazu
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)

# pobranie pierwszej klatki jako referencyjnej
ret, start_frame = cap.read()


# start_frame = imutils.resize(start_frame, width=500)
# można zmieniać wymiary badanej klatki względem wielkości px otrzymanego wideo

start_frame = cv2.cvtColor(start_frame, cv2.COLOR_BGR2GRAY)
# konwertuje kolorową klatkę na klatkę szarą - do badania ruchu

start_frame = cv2.GaussianBlur(start_frame, (21,21),0)
alarm = False
# zmienna do odpalania alarmu na przycisk
alarm_mode = False

alarm_counter = 0
# zmienna do ustalenia jak długo od pierwszego wykrycia ruchu ma miniąć, by alarm się załączył


def detection_events():
    # wszystko co chcemy robić po zauważeniu ruchu, w tej funkcji.
    global alarm
    for _ in range(5):
        if not alarm_mode:
            break
        print("Movement noticed!")

        _, frame_to_send = cap.read()

        # Zapisz obraz jako plik JPEG zakodowany w Base64
        if frame_to_send is not None:
            frame_to_send = save_snapshot_as_base64(frame_to_send, directory='./output_photos')
        
            # print(frame_to_send) #test: printuje jako tekst base64

            # load_dotenv()
            # # Pobierz klucz API z pliku .env
            # api_key = os.getenv('API_KEY')
            
            # # Przygotuj ciało żądania
            
            # body = {
            #     "imageBase64": frame_to_send
            # }

            # # Nagłówki żądania
            # headers = {
            #     'x-api-key': api_key,
            #     'Content-Type': 'application/json'
            # }

            # # URL endpointu, na który wysyłasz żądanie (zmień na odpowiedni)
            # # Pobierz URL z pliku .env
            # url = os.getenv('ENDPOINT_URL')
            # # url = 'https://api.yourservice.com/endpoint'

            # # Wyślij żądanie POST
            # response = requests.post(url, json=body, headers=headers)

            # # Sprawdź odpowiedź
            # if response.status_code == 200:
            #     print('Success:', response.json())
            # else:
            #     print('Error:', response.status_code, response.text)
            
            # Pauza przez 10 sekund - do ustawienia przerwa nim rozpocznie wykrywanie kolejnego zwierzęcia
            time.sleep(10)

    alarm = False


# MAIN LOOP

while True:
    try:
        ret, frame = cap.read()

        if not ret:
            print("Koniec filmu lub błąd odczytu.")
            break
        
        # frame = imutils.resize(frame, width=500)

        if alarm_mode:
            frame_bw = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            frame_bw = cv2.GaussianBlur(frame_bw, (5,5), 0)
            difference = cv2.absdiff(frame_bw, start_frame)
            threshold = cv2.threshold(difference, 25, 255, cv2.THRESH_BINARY)[1]
            start_frame = frame_bw
        
            if threshold.sum() > 500: #wartość ustala "czułośc" wykrywania ruchu - im mniej tym bardziej czuły
                alarm_counter += 1
            else:
                if alarm_counter > 0:
                    alarm_counter -= 1

            cv2.imshow('Video Stream', threshold)
        else:
            cv2.imshow('Video Stream', frame)
            # Wyświetl strumień wideo w oknie

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


# Zwolnij obiekt kamery wideo i zamknij okna
cap.release()
cv2.destroyAllWindows()