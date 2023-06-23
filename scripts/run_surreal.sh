#!/usr/bin/env bash

MODE=${@:-memory}

surreal start -u root -p password ${MODE}
