#!/bin/sh

# Vars
pkg_version="1.0.0-beta.4"

echo "[VueSandbox - v$pkg_version]"
echo "---"

# Check for required commands (git, node, yarn)
command -v git >/dev/null 2>&1 || {
  echo >&2 "> 'git' is missing: installing...";
  sudo apt install git
}
command -v nodejs >/dev/null 2>&1 || {
  echo >&2 "> 'nodejs' is missing: installing...";
  sudo apt install nodejs
}
command -v yarn >/dev/null 2>&1 || {
  echo >&2 "> 'yarn' is missing: installing...";
  # Add yarn repo to the apt
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt update && sudo apt install yarn
}

yarn install
