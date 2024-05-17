import cv2
import os
from save_snapshot import save_snapshot_as_base64

video_path = os.path.join('.', 'input', 'input.mp4')

cap = cv2.VideoCapture(video_path)


ret, frame1 = cap.read()
ret, frame2 = cap.read()

while cap.isOpened():

    ret, frame = cap.read()

    diffrence = cv2.absdiff(frame1, frame2)
    gray = cv2.cvtColor(diffrence, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5,5), 0)
    _,thresh = cv2.threshold(blur, 20, 255,cv2.THRESH_BINARY)
    dilated = cv2.dilate(thresh, None, iterations=3)
    contours, _ = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # cv2.drawContours(frame1, contours, -1, (0,255,0), 2)
    for contour in contours:
        (x, y, w, h) = cv2.boundingRect(contour)
    
        if cv2.contourArea(contour) < 3000:
            continue
        cv2.rectangle(frame1,(x,y),(x+w,y+h),(0,255,0),2)

    cv2.imshow('frame', frame1)

    frame1=frame2
    ret, frame2 = cap.read()

    key_pressed = cv2.waitKey(30)
    
    if key_pressed == ord('q'):
       break

cap.release()
cv2.destroyAllWindows()