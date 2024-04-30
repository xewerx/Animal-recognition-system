import cv2
import os

video_path = os.path.join('.', 'input', 'input.mp4')

video = cv2.VideoCapture(video_path)

ret = True

while ret:
    ret, frame = video.read()

    cv2.imshow('frame', frame)

    key_pressed = cv2.waitKey(30)
    
    if key_pressed == ord('q'):
       break

video.release()
cv2.destroyAllWindows()