#!/bin/sh
FILE=scan
#ARGS
MODE=$1
RESOLUTION=$2
FORMAT=$3
#SCAN IMAGE AND CONVER TO FILE
scanimage -p  --device-name=epson2 --format=$FORMAT --mode=$MODE --resolution=$RESOLUTION  > scan.$FORMAT 
convert scan.$FORMAT ./public/out.$FORMAT
#COPY TO DIR
cp ./public/out.$FORMAT /Users/belvedersky/Code/Node/scanner/Cканы/скан_$(date "+%Y_%m_%d_%H_%M_%S").$FORMAT 
#DONE
echo "Done"