#!/usr/bin/env bash
# Pull the latest source from GitHub into /app.
# Usage: bash /app/sync.sh
set -euo pipefail

REPO="__REPO_URL__"
TMP="$(mktemp -d)"

echo "Fetching latest from $REPO ..."
git clone --depth 1 --quiet "$REPO" "$TMP/repo"

echo "Updating /app ..."
rsync -a --delete "$TMP/repo/frontend/src/" /app/frontend/src/
rsync -a "$TMP/repo/frontend/public/" /app/frontend/public/
rsync -a --exclude='.env' "$TMP/repo/backend/" /app/backend/

rm -rf "$TMP"
echo "Done. The dev server should hot-reload shortly."
