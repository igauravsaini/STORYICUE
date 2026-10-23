#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

echo "=== Stopping previous instances if any ==="
vega virtual-device stop || true

echo "=== Starting Virtual Device ==="
vega virtual-device start --timeout=120

echo "=== Virtual Device Status ==="
vega virtual-device status

echo "=== Device List ==="
vega device list
