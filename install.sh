#!/bin/sh

# Check for required commands (git, node, yarn)
command -v gitx >/dev/null 2>&1 || {
  echo >&2 "> 'git' is missing: installing...";
  sudo apt install git
}
command -v nodejsx >/dev/null 2>&1 || {
  echo >&2 "> 'nodejs' is missing: installing...";
  sudo apt install nodejs
}
command -v yarnx >/dev/null 2>&1 || {
  echo >&2 "> 'yarn' is missing: installing...";
  # Add yarn repo to the apt
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt update && sudo apt install yarn
}

yarn install
