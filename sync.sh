#!/usr/bin/env bash
# Pull the latest source from GitHub into /app.
#
#   bash sync.sh
#
# Copies frontend/src, frontend/public and backend over the running app.
# Never touches .env files, so MONGO_URL / SMTP credentials survive a sync.
set -euo pipefail

REPO="https://github.com/Pradyumbansal/wedding-invite.git"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Fetching latest from $REPO ..."
git clone --depth 1 --quiet "$REPO" "$TMP/repo"

echo "Updating /app ..."
# Replace src outright so deleted/renamed files don't linger.
rm -rf /app/frontend/src
cp -a "$TMP/repo/frontend/src" /app/frontend/

# Additive copies: these leave untracked files (notably .env) untouched.
cp -a "$TMP/repo/frontend/public/." /app/frontend/public/
cp -a "$TMP/repo/backend/." /app/backend/

echo "Done. The frontend dev server hot-reloads on its own."
echo "If backend/server.py changed, restart it:  sudo supervisorctl restart backend"
