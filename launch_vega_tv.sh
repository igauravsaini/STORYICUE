#!/bin/bash
set -e

export DISPLAY="${DISPLAY:-:0}"
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

echo "=== Cleaning any previous stale locks ==="
rm -f /home/lenovo/.kepler/virtual_device/instances/*/*.lock 2>/dev/null || true
rm -f /home/lenovo/vega_instance/*.lock 2>/dev/null || true

echo "=== Launching Vega Virtual Device TV ==="
# Try vega virtual-device start first, with no-gl-accel
if /home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/bin/virtualdevice launch --name default_instance --gl-accel-off --audio-off --timeout-sec 300; then
  echo "=== Virtual Device Launch Succeeded ==="
else
  echo "=== Launching with create-and-launch fallback ==="
  /home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/bin/virtualdevice create-and-launch \
    --image-path "/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv" \
    --name default_instance \
    --timeout-sec 300 \
    --gl-accel-off \
    --audio-off
fi

echo "=== Checking Connected Devices ==="
vega exec vda devices || true
vega virtual-device status || true
