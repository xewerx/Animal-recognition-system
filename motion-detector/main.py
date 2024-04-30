import sys
import cv2
import numpy as np
import pandas as pd 
import imutils
import threading
import winsound
import os


video_path = os.path.join('.', 'input', 'input.mp4')
source = 'input/input.mp4' # nie działa ta wersja

# Tworzenie obiektu kamery wideo, może być w nawiasie np (0,1,2,3 i przełączanie między nimi jeśli kamer/źródeł jest więcej)
video_capture = cv2.VideoCapture(video_path, cv2.CAP_DSHOW)

#ustawienie obrazu
video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)

# pobranie pierwszej klatki jako referencyjnej
_, start_frame = video_capture.read()


# start_frame = imutils.resize(start_frame, width=720)
# można zmieniać wymiary badanej klatki względem wielkości px otrzymanego wideo

start_frame = cv2.cvtColor(start_frame, cv2.COLOR_BGR2GRAY)
# konwertuje kolorową klatkę na klatkę szarą - do badania ruchu

start_frame = cv2.GaussianBlur(start_frame, (21,21),0)


alarm = False

# zmienna do odpalania alarmu na przycisk
alarm_mode = False

alarm_counter = 0
# zmienna do ustalenia jak długo od pierwszego wykrycia ruchu ma miniąć, by alarm się załączył


def beep_alarm():
    # wszystko co chcemy robić po zauważeniu ruchu, w tej funkcji.
    global alarm
    for _ in range(5):
        if not alarm_mode:
            break
        print("Movement noticed!")


        # TODO: wysyłanie klatki
        _, frame_to_send = video_capture.read()
     

        winsound.Beep(2500, 1000) #powiadomienie dźwiękowe - do wywalenia.
    alarm = False




# MAIN LOOP

while True:
    _, frame = video_capture.read()
    # frame = imutils.resize(frame, width=720)

    if alarm_mode:
        frame_bw = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        frame_bw = cv2.GaussianBlur(frame_bw, (5,5), 0)


        difference = cv2.absdiff(frame_bw, start_frame)
        threshold = cv2.threshold(difference, 25, 255, cv2.THRESH_BINARY)[1]
        start_frame = frame_bw
    
        if threshold.sum() > 300: #wartość ustala "czułośc" wykrywania ruchu - im mniej tym bardziej czuły
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
            threading.Thread(target=beep_alarm).start()

    key_pressed = cv2.waitKey(30)
    if key_pressed == ord('t'):
        alarm_mode = not alarm_mode
        alarm_counter = 0

    
    if key_pressed == ord('q'):
        alarm_mode = False
        break


# Zwolnij obiekt kamery wideo i zamknij okna
video_capture.release()
cv2.destroyAllWindows()









# # Funkcja do wykrywania ruchu w klatce
# def detect_motion(frame, previous_frame):
#     # Konwertuj klatkę na odcienie szarości
#     gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     previous_gray_frame = cv2.cvtColor(previous_frame, cv2.COLOR_BGR2GRAY)
    
#     # Oblicz różnicę między aktualną klatką a poprzednią
#     frame_diff = cv2.absdiff(gray_frame, previous_gray_frame)
    
#     # Zastosuj binaryzację do zaznaczenia obszarów z ruchem
#     _, threshold = cv2.threshold(frame_diff, 20, 255, cv2.THRESH_BINARY)
    
#     # Znajdź kontury obszarów z ruchem
#     contours, _ = cv2.findContours(threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     # Jeśli znaleziono kontury, oznacz ruch
#     if contours:
#         return True
#     else:
#         return False

# while True:
#     # Pobierz kolejną klatkę
#     _, frame = video_capture.read()
    
#     # Wykryj ruch
#     motion_detected = detect_motion(frame, previous_frame)
    
#     # Wyślij informację do terminala
#     if motion_detected:
#         print("Ruch został wykryty!")
    
#     # Przypisz bieżącą klatkę jako poprzednią do kolejnej iteracji
#     previous_frame = frame.copy()
    
#     # Wyświetl strumień wideo w oknie
#     cv2.imshow('Video Stream', frame)
    


# # Zwolnij obiekt kamery wideo i zamknij okna
# video_capture.release()
# cv2.destroyAllWindows()
