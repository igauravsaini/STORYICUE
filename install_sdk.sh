#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "=== Installing Vega SDK (latest) ==="
vega sdk install

echo "=== SDK installed ==="
vega sdk list-installed
vega --version
vega --help 2>&1 | head -50
