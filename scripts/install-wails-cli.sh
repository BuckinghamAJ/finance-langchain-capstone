#!/usr/bin/env bash
set -euo pipefail

echo "Current Go version:"
go version

echo "Installing the Wails v3 command line tool..."
go install github.com/wailsapp/wails/v3/cmd/wails3@latest

echo "Wails v3 CLI installed."
