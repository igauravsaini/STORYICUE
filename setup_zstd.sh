#!/bin/bash
set -e

mkdir -p "$HOME/.local/bin"
cd /tmp
rm -rf zstd*
apt-get download zstd
dpkg -x zstd*.deb /tmp/zstd_pkg
cp /tmp/zstd_pkg/usr/bin/zstd "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/zstd"

# Also check for libzstd if needed
if [ -d /tmp/zstd_pkg/usr/lib/x86_64-linux-gnu ]; then
  mkdir -p "$HOME/.local/lib"
  cp -r /tmp/zstd_pkg/usr/lib/x86_64-linux-gnu/* "$HOME/.local/lib/" 2>/dev/null || true
fi

rm -rf zstd*
export PATH="$HOME/.local/bin:$PATH"
zstd --version
echo "=== zstd successfully installed ==="
