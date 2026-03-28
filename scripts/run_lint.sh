#!/usr/bin/env bash

cd app && make lint && cd ..

cd panel && bun lint && cd ..

# ask to commit and push 
read -p "Do you want to commit and push changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add -A && git commit -m "chore: format and lint [skip ci]" && git push
fi
