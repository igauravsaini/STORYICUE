#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

SRC_DIR="/mnt/d/chrome extentions/STORYICUE/build/private/vega/aarch64/Release"
DEST_DIR="/mnt/d/chrome extentions/STORYICUE/build/dist"
mkdir -p "$DEST_DIR"

echo "=== Packaging ==="
vega exec vpt pack "$SRC_DIR" -n StoryCue_aarch64 -d "$DEST_DIR" --validate

echo "=== Validating package with vpt info ==="
VPKG="$DEST_DIR/StoryCue_aarch64.vpkg"
vega exec vpt info "$VPKG" --json

echo "=== PACKAGE CREATION & VALIDATION SUCCESSFUL ==="
ls -lh "$VPKG"
