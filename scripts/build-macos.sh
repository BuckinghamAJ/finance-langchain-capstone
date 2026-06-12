#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Building app for macOS universal..."
(cd "$ROOT_DIR" && wails3 build GOOS=darwin GOARCH=arm64)
(cd "$ROOT_DIR" && wails3 build GOOS=darwin GOARCH=amd64)
