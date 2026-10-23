#!/bin/bash
set -e

# Download and install Java 21 (Temurin) without sudo
JAVA_DIR="$HOME/.java"
mkdir -p "$JAVA_DIR"

echo "Downloading Java 21..."
curl -fsSL "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jdk_x64_linux_hotspot_21.0.4_7.tar.gz" -o /tmp/java21.tar.gz

echo "Extracting..."
tar -xzf /tmp/java21.tar.gz -C "$JAVA_DIR"
rm /tmp/java21.tar.gz

# Find the extracted directory
JAVA_HOME=$(find "$JAVA_DIR" -maxdepth 1 -type d -name "jdk-*" | head -1)

echo "export JAVA_HOME=\"$JAVA_HOME\"" >> "$HOME/.bashrc"
echo "export PATH=\"$JAVA_HOME/bin:\$PATH\"" >> "$HOME/.bashrc"

export JAVA_HOME="$JAVA_HOME"
export PATH="$JAVA_HOME/bin:$PATH"

java --version
echo "=== Java installed at $JAVA_HOME ==="
