#!/usr/bin/env bash
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
sleep 3
pwd
npm run dev
sleep 3
