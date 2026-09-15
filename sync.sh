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
git clone --depth 1 --branch main --quiet "$REPO" "$TMP/repo"

echo "Updating /app ..."
# Replace src outright so deleted/renamed files don't linger.
rm -rf /app/frontend/src
cp -a "$TMP/repo/frontend/src" /app/frontend/

# Additive copies: these leave untracked files (notably .env) untouched.
cp -a "$TMP/repo/frontend/public/." /app/frontend/public/
cp -a "$TMP/repo/backend/." /app/backend/

# Replacing frontend/src breaks webpack's inode watches, so the dev server must
# be restarted or it will keep serving the previous bundle.
echo "Restarting services ..."
sudo supervisorctl restart frontend backend || \
  echo "Could not restart automatically — run: sudo supervisorctl restart frontend backend"

echo
echo "Done. Give the frontend ~30-60s to recompile, then hard-refresh (Ctrl+Shift+R)."
