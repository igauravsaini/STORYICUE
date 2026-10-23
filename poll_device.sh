#!/bin/bash
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
echo "=== vda get-state ==="
vega exec vda -s emulator-5554 get-state 2>&1 || true
echo "=== vega device list ==="
vega device list || true
echo "=== vda devices ==="
vega exec vda devices 2>&1 || true
