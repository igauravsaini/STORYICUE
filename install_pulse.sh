#!/bin/bash
set -e

mkdir -p "$HOME/.local/lib"
cd /tmp
rm -rf pulse_work
mkdir -p pulse_work
cd pulse_work

apt-get download libpulse0 libpulse-mainloop-glib0 libsndfile1 2>/dev/null || true
for f in *.deb; do
  [ -f "$f" ] && dpkg -x "$f" .
done

cp -a usr/lib/x86_64-linux-gnu/* "$HOME/.local/lib/" 2>/dev/null || true
cd "$HOME/.local/lib"
[ -f libpulse.so.0.24.3 ] && ln -sf libpulse.so.0.24.3 libpulse.so.0
[ -f libpulse-simple.so.0.1.1 ] && ln -sf libpulse-simple.so.0.1.1 libpulse-simple.so.0

# Add ~/.local/lib to ld.so.conf or bashrc
echo "export LD_LIBRARY_PATH=\"\$HOME/.local/lib:\$HOME/.local/lib/pulseaudio:\$LD_LIBRARY_PATH\"" >> "$HOME/.bashrc"

echo "=== Verified libpulse in ~/.local/lib ==="
ls -la "$HOME/.local/lib/libpulse"*
