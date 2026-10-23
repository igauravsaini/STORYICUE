#!/bin/bash
set -e

mkdir -p "$HOME/.local/lib"
cd /tmp
rm -rf codecs_work
mkdir -p codecs_work
cd codecs_work

apt-get download libflac14 libvorbis0a libvorbisenc2 libopus0 libogg0 libmpg123-0 libmp3lame0 2>/dev/null || true
for f in *.deb; do
  [ -f "$f" ] && dpkg -x "$f" .
done

cp -a usr/lib/x86_64-linux-gnu/* "$HOME/.local/lib/" 2>/dev/null || true

cd "$HOME/.local/lib"
export LD_LIBRARY_PATH="$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"
echo "=== Missing deps for libpulse.so.0: ==="
ldd "$HOME/.local/lib/libpulse.so.0" | grep -i "not found" || echo "ALL LIBS FOUND!"
