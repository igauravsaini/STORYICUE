#!/bin/bash
set -e

mkdir -p "$HOME/.local/lib"
cd /tmp
rm -rf codecs_work
mkdir -p codecs_work
cd codecs_work

PACKAGES="libflac14 libvorbis0a libvorbisenc2 libopus0 libogg0 libmpg123-0t64 libmp3lame0"
for pkg in $PACKAGES; do
  echo "Downloading $pkg..."
  apt-get download "$pkg" || true
done

for f in *.deb; do
  [ -f "$f" ] && dpkg -x "$f" .
done

cp -a usr/lib/x86_64-linux-gnu/* "$HOME/.local/lib/" 2>/dev/null || true

cd "$HOME/.local/lib"
# Create standard soname symlinks if any are missing
[ -f libmpg123.so.0.* ] && ln -sf libmpg123.so.0.* libmpg123.so.0 || true
[ -f libmp3lame.so.0.* ] && ln -sf libmp3lame.so.0.* libmp3lame.so.0 || true
[ -f libogg.so.0.* ] && ln -sf libogg.so.0.* libogg.so.0 || true
[ -f libopus.so.0.* ] && ln -sf libopus.so.0.* libopus.so.0 || true
[ -f libvorbis.so.0.* ] && ln -sf libvorbis.so.0.* libvorbis.so.0 || true
[ -f libvorbisenc.so.2.* ] && ln -sf libvorbisenc.so.2.* libvorbisenc.so.2 || true
[ -f libFLAC.so.14.* ] && ln -sf libFLAC.so.14.* libFLAC.so.14 || true

rm -rf /tmp/codecs_work

echo "=== Verifying all dependencies for emulator ==="
EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"
ldd "$EMU_DIR/qemu/linux-x86_64/vega-virtual-device" | grep -i "not found" || echo "SUCCESS: ALL SHARED LIBRARIES SATISFIED!"
