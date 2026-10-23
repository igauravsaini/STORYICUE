#!/bin/bash
set -e

mkdir -p "$HOME/.local/bin"

cat << 'EOF' > "$HOME/.local/bin/vda"
#!/bin/bash
vega exec vda "$@"
EOF
chmod +x "$HOME/.local/bin/vda"

cat << 'EOF' > "$HOME/.local/bin/kepler"
#!/bin/bash
vega exec kepler "$@"
EOF
chmod +x "$HOME/.local/bin/kepler"

cat << 'EOF' > "$HOME/.local/bin/vvman"
#!/bin/bash
vega exec vvman "$@"
EOF
chmod +x "$HOME/.local/bin/vvman"

export PATH="$HOME/.local/bin:$HOME/.java/jdk-21.0.4+7/bin:$HOME/vega/bin:$PATH"
echo "=== Testing wrappers ==="
vda devices
kepler --v || true
