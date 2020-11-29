#!/bin/bash

cd /home/ubuntu
sudo apt-get update
sudo apt-get -y upgrade
sudo rm -rf node_modules
sudo rm -f package-lock.json
npm install
NODE_ENV=prod npm start
