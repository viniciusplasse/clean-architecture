#!/bin/bash

cd /home/ubuntu
sudo apt-get update
sudo apt-get -y upgrade
sudo rm -rf node_modules
sudo rm package-lock.json
npm install
