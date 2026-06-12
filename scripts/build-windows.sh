#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Building app for Windows amd64..."
(cd "$ROOT_DIR" && wails3 build GOOS=windows GOARCH=amd64)
