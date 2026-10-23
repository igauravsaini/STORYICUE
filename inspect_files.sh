#!/bin/bash
export PATH="$HOME/.local/bin:$HOME/vega/bin:$PATH"
find "/mnt/d/chrome extentions/STORYICUE/build/private" -maxdepth 5
echo "--- vpt info on dist/StoryCue.vpkg ---"
vega exec vpt info "/mnt/d/chrome extentions/STORYICUE/dist/StoryCue.vpkg" --json || true
