#!/usr/bin/env bash

sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin libusb-dev
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
