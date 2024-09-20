ffmpeg -protocol_whitelist "file,rtp,udp" -stream_loop -1 -re -i input/tiger2.mp4 -c:v libx264 -bsf:v h264_mp4toannexb -vcodec copy -an -f rtp rtp://127.0.0.1:5004 -sdp_file stream.sdp
