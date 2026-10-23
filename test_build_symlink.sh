#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

ln -sfn "/mnt/d/chrome extentions/STORYICUE" "$HOME/storycue"
cd "$HOME/storycue"
echo "=== Building from $(pwd) (symlink without spaces) ==="
npm run build
