#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$PATH"
rm -rf /tmp/vpkg_test
mkdir -p /tmp/vpkg_test
cd /tmp/vpkg_test
tar -I zstd -xf "/mnt/d/chrome extentions/STORYICUE/build/private/kepler/@amazon-devices/storycue/undefined/vega/aarch64/Release/@amazon-devices/storycue_aarch64.vpkg"
ls -la
echo "=== head manifest.toml ==="
head -20 manifest.toml
echo "=== od -c manifest.toml ==="
od -c manifest.toml | head -10
