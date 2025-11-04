#!/bin/bash

# Check if input folder is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <input_folder>"
    exit 1
fi

INPUT_FOLDER="$1"

# 看一下cwebp压缩的效果如何
total_diff=0
while IFS= read -r file; do
    if [ -f "$file.webp" ]; then
        size_webp=$(stat -f%z "$file.webp")
        size_png=$(stat -f%z "$file")
        if [ $size_webp -gt $size_png ]; then
            echo "$file.webp"
        fi
        diff=$(echo "($size_webp - $size_png)/1024/1024" | bc)
        total_diff=$(($total_diff + $diff))
        continue
    fi
done < <(find "$INPUT_FOLDER" -type f -iname "*.png")
echo "Total size difference: $((total_diff)) MB"
