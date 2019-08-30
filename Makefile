#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: MPL-2.0
#{
# Copyright 2019-present Samsung Electronics France SAS, and other contributors
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/#
#}

default: help
	@echo "log: $@: $^"

project?=webthing-aframe
runtime?=node
example_file=index.js
port?=8880
view_url?=http://localhost:${port}?verbose=yes&useWs=no
browser?=x-www-browser


%: ${runtime}/%
	@echo "# log: $@: $^"


help:
	@echo "# Usage:"
	@echo "# make runtime=${runtime} start"

LICENSE: /usr/share/common-licenses/MPL-2.0
	cp -a $< $@


node/start: ${example_file} node_modules 
	PORT=${port} node $<

setup:
	@echo "# log: $@: $^"

check:
	@echo "# log: $@: $^"

test:
	@echo "# log: $@: $^"

node_modules:
	npm install

modules: ${node_modules}
	ls $^

start: ${runtime}/start
	@echo "# log: $@: $^"

demo:
	xterm -e make -C example/webthing-node start &
	@sleep 1
	xterm -e make -C example/webthing-node demo &
	@sleep 1
	xterm -e make start &
	@sleep 1
	${browser} "${view_url}"
