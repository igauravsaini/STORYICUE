#!/bin/bash
echo "Step 1: Check environment"
export DISPLAY="${DISPLAY:-:0}"
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

echo "Step 2: Check kepler version"
kepler --v || echo "kepler failed"

echo "Step 3: Try virtualdevice launch directly"
/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/bin/virtualdevice launch --name default_instance --gl-accel-off --audio-off --timeout-sec 60
RC=$?
echo "virtualdevice launch exited with code: $RC"
