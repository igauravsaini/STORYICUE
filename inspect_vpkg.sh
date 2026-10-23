#!/bin/bash
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"

VPKG="/mnt/d/chrome extentions/STORYICUE/build/private/kepler/@amazon-devices/storycue/undefined/vega/aarch64/Release/@amazon-devices/storycue_aarch64.vpkg"
file "$VPKG"
tar -tf "$VPKG" 2>&1 || unzip -l "$VPKG" 2>&1 || true
