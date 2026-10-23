#!/bin/bash
set -e

mkdir -p "$HOME/.local/bin"
VDA_PATH=$(find /home/lenovo/vega/sdk -name vda -type f | head -1)
KEPLER_PATH=$(find /home/lenovo/vega/sdk -name kepler -type f -perm -111 | head -1)

echo "VDA: $VDA_PATH"
echo "KEPLER: $KEPLER_PATH"

[ -n "$VDA_PATH" ] && ln -sf "$VDA_PATH" "$HOME/.local/bin/vda"
[ -n "$KEPLER_PATH" ] && ln -sf "$KEPLER_PATH" "$HOME/.local/bin/kepler"

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
vda devices || true
kepler --v || true
