#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Complete setup by piping Enter for the directory prompt
echo "" | vega setup 2>/dev/null || true

# Verify
echo "=== Vega version ==="
vega --version

echo "=== Vega help ==="
vega --help 2>&1 | head -30
