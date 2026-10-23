#!/bin/bash
set -e

mkdir -p "$HOME/.local/bin"
cd /tmp
rm -rf unzip*
apt-get download unzip
dpkg -x unzip*.deb /tmp/unzip_pkg
cp /tmp/unzip_pkg/usr/bin/unzip "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/unzip"
rm -rf unzip*

export PATH="$HOME/.local/bin:$PATH"
unzip -v | head -2
echo "=== unzip successfully installed ==="
