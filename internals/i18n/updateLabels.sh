#!/bin/bash

echo "$(date -u): Committing updated labels..."

git add .
git commit -m "[spr/itops] Extracted labels for translation through Job"
git config push.default upstream
git push origin HEAD:master
