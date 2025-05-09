#!/bin/bash

# Check if input folder is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <input_folder>"
    exit 1
fi

INPUT_FOLDER="$1"

# Iterate over each PNG file in the input folder
for file in "$INPUT_FOLDER"/*.png; do
    if [ -f "$file" ] && [ $(stat -f%z "$file") -gt $((23 * 1024 * 1024)) ]; then
        echo "Processing $file..."
        pngquant 256 -f --skip-if-larger --strip --ext=.png "$file"
    fi
done

echo "Compression completed."