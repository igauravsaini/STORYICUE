#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd "/mnt/d/chrome extentions/STORYICUE"
echo "=== Installing npm dependencies ==="
npm install

echo "=== Virtual device help ==="
vega virtual-device --help || true

echo "=== Testing build ==="
npm run build
