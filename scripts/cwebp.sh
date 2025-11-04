#!/bin/bash

# Check if input folder is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <input_folder>"
    exit 1
fi

INPUT_FOLDER="$1"

# Iterate over each PNG file in the input folder, compress to webp
find "$INPUT_FOLDER" -type f -iname "*.png" | while read -r file; do
    if [ -f "$file.webp" ]; then
        # rm "$file.webp" # clean up
        continue
    fi
    file_type=$(file --brief --mime-type "$file")
    if [ "$file_type" = "image/png" ]; then
        echo "Processing $file"
        cwebp -q 70 -quiet "$file" -o "$file.webp"
        # 使用质量较低的有损压缩
    else
        echo "Warning: $file is not a png file."
    fi
done

echo "Compression completed."
