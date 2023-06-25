#!/bin/bash
cd "$(dirname "$0")"
GMI=$(find ../gemini/build | grep '\.gmi')
rm -rf build
mkdir build
while IFS= read -r i; do
	basefile=$(basename $i)
	filepath=$(echo "build${i#../gemini/build}" | sed 's/gmi$/txt/')
	if [ "$basefile" = "index.gmi" ] ; then
		filepath=$(echo "build${i#../gemini/build}" | sed 's/index\.gmi$/gophermap/')
	fi
	mkdir -p "${filepath%/*}" && touch $filepath
	echo "Converting $i -> $filepath"
	if [ "$basefile" = "index.gmi" ] ; then
		gmi2gopher "$i" > $filepath
	else
		gmi2gopher -t "$i" > $filepath
	fi
done <<< "$GMI"

NONGMI=$(find ../gemini/build | grep -v '\.gmi' | grep '\.')
while IFS= read -r i; do
	filepath=$(echo "build${i#../gemini/build}")
	mkdir -p "${filepath%/*}"
	echo "Copying $i -> $filepath"
	cp "$i" "$filepath" 2>/dev/null
done <<< "$NONGMI"

echo "Copying gopher sources over..."
cp -r src/* build

echo "Renaming gemlog to phlog..."
mv build/gemlog build/phlog
echo "Done!"
# GOPHER=$(find src | grep -E '(\.|gophermap)')
# while IFS= read -r i; do
# 	filepath=$(echo "gopher-auto${i#gopher}")
# 	mkdir -p "${filepath%/*}"
# 	echo "Copying $i -> $filepath"
# 	cp "$i" "$filepath"
# done <<< "$GOPHER"