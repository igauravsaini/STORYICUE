#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"

echo "=== Virtual Device Status ==="
vega virtual-device status || true
