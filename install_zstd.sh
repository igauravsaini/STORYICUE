#!/bin/bash
set -e

mkdir -p "$HOME/.local/bin"
echo "=== Installing zstd ==="
# Download pre-built zstd binary or tarball
curl -fsSL https://github.com/facebook/zstd/releases/download/v1.5.6/zstd-v1.5.6-linux-x86_64.tar.gz -o /tmp/zstd.tar.gz
tar -xzf /tmp/zstd.tar.gz -C /tmp/
cp /tmp/zstd-v1.5.6-linux-x86_64/bin/zstd "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/zstd"
rm -rf /tmp/zstd*

export PATH="$HOME/.local/bin:$PATH"
zstd --version
echo "=== zstd installed successfully ==="
