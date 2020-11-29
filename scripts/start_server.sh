#!/bin/bash

cd /home/ubuntu
apt-get update
apt-get -y upgrade
rm -rf node_modules
rm package-lock.json
npm install
npm start
