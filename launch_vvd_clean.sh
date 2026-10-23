#!/bin/bash
set -e

VVD_BIN="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/bin/virtualdevice"
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
IMAGE_PATH="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv"

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

mkdir -p "$HOME/.kepler/virtual_device/instances"
mkdir -p "$HOME/.kepler/virtual_device/log"

echo "=== Stopping any running virtualdevice ==="
"$VVD_BIN" stop --name default_instance 2>/dev/null || true
killall -9 vega-virtual-device 2>/dev/null || true
sleep 2

echo "=== Creating and Launching Virtual Device ==="
"$VVD_BIN" create-and-launch \
  --image-path "$IMAGE_PATH" \
  --name default_instance \
  --timeout-sec 600 \
  --gl-accel-off \
  --audio-off \
  --cpu-cores 4 \
  --memory-mb 2048

echo "=== Virtual Device Boot Complete! ==="
vega exec vda devices
vega exec vda -s emulator-5554 get-state
