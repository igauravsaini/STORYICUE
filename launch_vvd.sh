#!/bin/bash
set -e

EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

echo "=== Stopping any running instances ==="
vega virtual-device stop || true
rm -rf /home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/instances/* 2>/dev/null || true

echo "=== Starting Vega Virtual Device ==="
vega virtual-device start --timeout=120

echo "=== Virtual Device Status ==="
vega virtual-device status

echo "=== Connected Devices ==="
vega device list
