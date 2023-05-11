#!/usr/bin/env bash

VERSION=0.15.3
ARCH=darwin_arm64
mkdir -p pocketbase_doc
wget "https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${ARCH}.zip" -O pocketbase.zip
unzip -d pocketbase_doc pocketbase.zip
rm pocketbase.zip
mv pocketbase_doc/pocketbase .
