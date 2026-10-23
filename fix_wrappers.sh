#!/bin/bash
cat << 'EOF' > "$HOME/.local/bin/kepler"
#!/bin/bash
export PATH="/home/lenovo/.local/bin:/home/lenovo/vega/bin:$PATH"
exec /home/lenovo/vega/bin/vega exec kepler "$@"
EOF
chmod +x "$HOME/.local/bin/kepler"

cat << 'EOF' > "$HOME/.local/bin/vda"
#!/bin/bash
export PATH="/home/lenovo/.local/bin:/home/lenovo/vega/bin:$PATH"
exec /home/lenovo/vega/bin/vega exec vda "$@"
EOF
chmod +x "$HOME/.local/bin/vda"

cat << 'EOF' > "$HOME/.local/bin/vvman"
#!/bin/bash
export PATH="/home/lenovo/.local/bin:/home/lenovo/vega/bin:$PATH"
exec /home/lenovo/vega/bin/vega exec vvman "$@"
EOF
chmod +x "$HOME/.local/bin/vvman"

echo "Testing ~/.local/bin/kepler --v:"
/home/lenovo/.local/bin/kepler --v
