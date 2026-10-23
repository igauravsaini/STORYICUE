#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
VPKG="/mnt/d/chrome extentions/STORYICUE/dist/StoryCue.vpkg"

echo "=== Devices ==="
vega exec vda devices

echo "=== Installing StoryCue.vpkg onto emulator-5554 ==="
vega exec vda -s emulator-5554 install "$VPKG" || vega run-app "$VPKG" com.storycue.app || true

echo "=== Launching com.storycue.app ==="
vega exec vda -s emulator-5554 shell "appctl start com.storycue.app" 2>/dev/null || vega exec vda -s emulator-5554 shell "am start -n com.storycue.app/.MainActivity" 2>/dev/null || true

echo "=== Checking running processes on device ==="
vega exec vda -s emulator-5554 shell ps 2>/dev/null | grep -i storycue || true
