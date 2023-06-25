#!/bin/bash
cd "$(dirname "$0")"
GMI=$(find ../../src | grep '\.html' | grep -v "src/portfolio/" | grep -v "src/shrines/" | grep -v "style/" | grep -v "script/" | grep -v "src/subsite/" | grep -v "src/random/" | grep -v "src/img/" | grep -v "src/blog/")
rm -rf build
mkdir build
while IFS= read -r i; do
	basefile=$(basename $i)
	filepath=$(echo "build${i#../../src}" | sed 's/html$/gmi/')
	mkdir -p "${filepath%/*}" && touch $filepath
	echo "Converting $i -> $filepath"
  npx html2gmi "$i" > $filepath
  if [ -s $filepath ] ; then
    # do nothing
    echo "$filepath generated"
  else
    rm $filepath
  fi
done <<< "$GMI"

echo "Copying source files over..."
cp -r src/* build

echo "Done!"
exit