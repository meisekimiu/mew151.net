#!/bin/bash
echo "iDirectory:"
files=$(ls -r -1 *.txt)
while IFS= read -r i; do
    echo -e "0$i\t$i"
done <<< "$files"

