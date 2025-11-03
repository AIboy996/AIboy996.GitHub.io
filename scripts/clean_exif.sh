#!/bin/bash
# 清除当前目录及子目录中所有图片和视频的 EXIF 信息
echo "🧹 Searching and cleaning EXIF data recursively..."

exiftool -overwrite_original -r -all= -ext jpg -ext jpeg -ext png -ext heic -ext tiff -ext webp -ext gif -ext mov -ext mp4 -ext avi -ext mkv .

echo "✨ All EXIF data cleaned."