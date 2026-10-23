#!/bin/bash
set -e

EMU_DIR="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/vmtools/agent"
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export LD_LIBRARY_PATH="$EMU_DIR/lib64:$EMU_DIR/lib64/qt/lib:$HOME/.local/lib:$HOME/.local/lib/pulseaudio:$LD_LIBRARY_PATH"

# Setup instance directory
INST_DIR="/home/lenovo/vega_instance"
if [ ! -d "$INST_DIR" ]; then
  mkdir -p "$INST_DIR"
  IMAGE_FILES="/home/lenovo/vega/sdk/vega-sdk/main/0.24.12112/vvd/images/tv/image_files"
  ln -sf "$IMAGE_FILES/bootloader" "$INST_DIR/bootloader"
  ln -sf "$IMAGE_FILES/bzImage" "$INST_DIR/bzImage"
  ln -sf "$IMAGE_FILES/initramfs.cpio.gz" "$INST_DIR/initramfs.cpio.gz"
  ln -sf "$IMAGE_FILES/system.ext4" "$INST_DIR/system.ext4"
  cp "$IMAGE_FILES/userdata.qcow2" "$INST_DIR/userdata.qcow2" 2>/dev/null || true
  cp "$IMAGE_FILES/vendor.ext4" "$INST_DIR/vendor.ext4" 2>/dev/null || true
  cp "$IMAGE_FILES/cache.ext4" "$INST_DIR/cache.ext4" 2>/dev/null || true
  cp "$IMAGE_FILES/misc.img" "$INST_DIR/misc.img" 2>/dev/null || true
  cp "$IMAGE_FILES/keys.ext4" "$INST_DIR/keys.ext4" 2>/dev/null || true
  cp "$IMAGE_FILES/idme.img" "$INST_DIR/idme.img" 2>/dev/null || true
  cp "$IMAGE_FILES/config.ini" "$INST_DIR/config.ini" 2>/dev/null || true
  cp "$IMAGE_FILES/metadata" "$INST_DIR/metadata" 2>/dev/null || true
fi

# Kill any existing emulator
killall -9 vega-virtual-device 2>/dev/null || true
sleep 2

echo "=== Launching emulator daemon ==="
nohup "$EMU_DIR/emulator" \
  -avd-arch x86_64 \
  -skindir "$EMU_DIR/skins" \
  -skin tv-remote \
  -ports 5554,5555 \
  -dns-server auto \
  -sysdir "$INST_DIR" \
  -datadir "$INST_DIR" \
  -data "$INST_DIR/userdata.qcow2" \
  -keyboard-mapping KEY_ESC:KEY_BACK,KEY_F1:KEY_HOMEPAGE,KEY_F2:KEY_MENU,KEY_F3:KEY_REWIND,KEY_F4:KEY_PLAYPAUSE,KEY_F5:KEY_FASTFORWARD \
  -qemu -qmp unix:/tmp/qmp-socket-5554.sock,server,nowait \
  > /tmp/emulator.log 2>&1 &

echo "Emulator launched with PID $!"
echo "=== Waiting for device to appear ==="
for i in {1..30}; do
  STATE=$(vega exec vda -s emulator-5554 get-state 2>&1 || true)
  echo "Attempt $i: state = $STATE"
  if [ "$STATE" = "device" ]; then
    echo "=== Virtual Device is ONLINE! ==="
    vega exec vda devices
    exit 0
  fi
  sleep 5
done

echo "Device still initializing..."
vega exec vda devices || true
