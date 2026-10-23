#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"

rm -rf /tmp/build_test
cp -r "/mnt/d/chrome extentions/STORYICUE/build/private/vega/aarch64/Release" /tmp/build_test

echo "=== Packaging on native ext4 /tmp ==="
vega exec vpt pack /tmp/build_test -n test_pkg -d /tmp/build_test --validate

echo "=== Running vpt info on /tmp/build_test/test_pkg.vpkg ==="
vega exec vpt info /tmp/build_test/test_pkg.vpkg --json
echo "=== EXT4 TEST FINISHED ==="
