#!/bin/bash
export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd "/mnt/d/chrome extentions/STORYICUE"
npx react-native build-vega --help
