#!/bin/bash
export LD_LIBRARY_PATH="$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"
echo "=== ldd on libpulse.so.0 ==="
ldd "$HOME/.local/lib/libpulse.so.0"
echo "=== ldd on vega-virtual-device (checking pulse only) ==="
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"
ldd "$EMU_DIR/qemu/linux-x86_64/vega-virtual-device" | grep -i "not found" || echo "ALL LIBS SATISFIED!"
