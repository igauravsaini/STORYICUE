#!/bin/bash
set -e

mkdir -p "$HOME/.local/lib"
cd /tmp
rm -rf deps_work
mkdir -p deps_work
cd deps_work

echo "=== Downloading libasyncns0 and pulseaudio dependencies ==="
apt-get download libasyncns0 libapparmor1 libwrap0 2>/dev/null || true
for f in *.deb; do
  [ -f "$f" ] && dpkg -x "$f" .
done

cp -a usr/lib/x86_64-linux-gnu/* "$HOME/.local/lib/" 2>/dev/null || true

cd "$HOME/.local/lib"
[ -f libasyncns.so.0.3.1 ] && ln -sf libasyncns.so.0.3.1 libasyncns.so.0

echo "=== Checking ldd for libpulse.so.0 ==="
export LD_LIBRARY_PATH="$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"
ldd "$HOME/.local/lib/libpulse.so.0" | grep -i "not found" || echo "All libpulse dependencies satisfied!"
