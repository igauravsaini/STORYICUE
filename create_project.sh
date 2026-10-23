#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd "/mnt/d/chrome extentions/STORYICUE"
echo "=== Generating project ==="
vega project generate --template helloWorld --name StoryCue --packageId com.storycue.app --outputDir .

echo "=== Generation Complete ==="
ls -la
