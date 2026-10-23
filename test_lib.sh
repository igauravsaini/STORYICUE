#!/bin/bash
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"
export PATH="$HOME/.local/bin:$HOME/vega/bin:$PATH"

echo "Testing vega version with LD_LIBRARY_PATH:"
vega version sdk || echo "vega version failed"

echo "Testing kepler --v:"
kepler --v || echo "kepler --v failed"
