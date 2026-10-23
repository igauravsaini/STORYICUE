#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

WORKSPACE_DIR="/mnt/d/chrome extentions/STORYICUE"
cd "$WORKSPACE_DIR"

echo "=== 1. Checking TypeScript ==="
npx tsc --noEmit
echo "TypeScript check passed successfully!"

echo "=== 2. Generating Metro JavaScript Bundle ==="
mkdir -p build/lib/rn-bundles/Release
npx react-native bundle \
  --platform kepler \
  --dev false \
  --entry-file index.js \
  --bundle-output build/lib/rn-bundles/Release/index.bundle \
  --assets-dest build/lib/rn-bundles/Release

echo "=== 3. Compiling bundle with Hermes ==="
# Find hermes compiler
HERMESC=$(find node_modules/ -name "hermesc" -type f -perm /111 | head -n 1)
if [ -z "$HERMESC" ]; then
  HERMESC="$HOME/.kepler/sdk/current/tools/hermesc"
fi
echo "Using hermesc at: $HERMESC"
"$HERMESC" -emit-binary -out build/lib/rn-bundles/Release/index.hermes.bundle build/lib/rn-bundles/Release/index.bundle
ls -lh build/lib/rn-bundles/Release/

echo "=== 4. Staging files for vpt pack ==="
STAGE_DIR="/tmp/storycue_stage"
rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR/lib/rn-bundles/Release"

# Copy hermes bundle and index bundle
cp build/lib/rn-bundles/Release/index.hermes.bundle "$STAGE_DIR/lib/rn-bundles/Release/"
cp build/lib/rn-bundles/Release/index.bundle "$STAGE_DIR/lib/rn-bundles/Release/"

# Copy assets if any
if [ -d build/lib/rn-bundles/Release/assets ]; then
  cp -r build/lib/rn-bundles/Release/assets "$STAGE_DIR/lib/rn-bundles/Release/"
fi

# Copy manifest.toml
cp manifest.toml "$STAGE_DIR/"

# Also copy to build/private/vega/x86_64/Release and aarch64
mkdir -p build/private/vega/x86_64/Release/lib/rn-bundles/Release
cp "$STAGE_DIR/lib/rn-bundles/Release/"* build/private/vega/x86_64/Release/lib/rn-bundles/Release/
cp manifest.toml build/private/vega/x86_64/Release/

echo "=== 5. Packaging with vpt pack ==="
mkdir -p dist
vega exec vpt pack "$STAGE_DIR" -n StoryCue -d /tmp --validate
cp /tmp/StoryCue.vpkg dist/StoryCue.vpkg
vega exec vpt info dist/StoryCue.vpkg --json

echo "=== BUILD AND PACKAGE COMPLETE ==="
ls -lh dist/StoryCue.vpkg
