#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd "/mnt/d/chrome extentions/STORYICUE"
echo "=== Building React Native bundle for target x86_64 ==="
npx react-native build-vega --build-type Release --target x86_64 --max-workers 2 || true

# Prepare packaging staging directory in native ext4 /tmp
STAGE_DIR="/tmp/storycue_stage"
rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR"

# Copy build artifacts to staging
if [ -d build/private/vega/x86_64/Release ]; then
  cp -r build/private/vega/x86_64/Release/* "$STAGE_DIR/"
else
  cp -r build/private/vega/aarch64/Release/* "$STAGE_DIR/"
fi

DIST_DIR="/mnt/d/chrome extentions/STORYICUE/dist"
mkdir -p "$DIST_DIR"

echo "=== Packaging StoryCue.vpkg with vpt ==="
vega exec vpt pack "$STAGE_DIR" -n StoryCue -d /tmp --validate
vega exec vpt info /tmp/StoryCue.vpkg --json

cp /tmp/StoryCue.vpkg "$DIST_DIR/StoryCue.vpkg"
echo "=== StoryCue.vpkg successfully generated ==="
ls -lh "$DIST_DIR/StoryCue.vpkg"
