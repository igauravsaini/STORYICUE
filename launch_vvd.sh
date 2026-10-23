#!/bin/bash
set -e

export DISPLAY="${DISPLAY:-:0}"
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

echo "=== Cleaning any previous stale locks ==="
rm -f /home/lenovo/.kepler/virtual_device/instances/*/*.lock 2>/dev/null || true
rm -f /home/lenovo/vega_instance/*.lock 2>/dev/null || true

echo "=== Starting Vega Virtual Device TV ==="
vega virtual-device start --timeout=180 --no-gl-accel

echo "=== Virtual Device Status ==="
vega virtual-device status

echo "=== Connected Devices ==="
vega device list
vega exec vda devices
