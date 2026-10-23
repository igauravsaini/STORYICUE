#!/bin/bash
set -e

# Install jq without sudo
mkdir -p "$HOME/.local/bin"
curl -fsSL "https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-linux-amd64" -o "$HOME/.local/bin/jq"
chmod +x "$HOME/.local/bin/jq"
export PATH="$HOME/.local/bin:$PATH"
jq --version

# Load Node and Java
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
export JAVA_HOME="$HOME/.java/jdk-21.0.4+7"
export PATH="$JAVA_HOME/bin:$PATH"

# Also add .local/bin to bashrc if not already there
grep -q '.local/bin' "$HOME/.bashrc" || echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"

# Install Vega CLI
echo "Installing Vega CLI..."
curl -fsSL https://sdk-installer.vega.labcollab.net/get_vvm.sh | bash

# Source env
[ -f "$HOME/vega/env" ] && source "$HOME/vega/env"
[ -f "$HOME/.vega/env" ] && source "$HOME/.vega/env"

echo "=== Checking vega ==="
vega --version 2>/dev/null || echo "Checking paths..."
find "$HOME/vega" -name "vega" -type f 2>/dev/null || true
find "$HOME/.vega" -name "vega" -type f 2>/dev/null || true
cat "$HOME/vega/env" 2>/dev/null || true
