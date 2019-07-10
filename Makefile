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
run_args?=
port?=8880
target_url?=http://localhost:${port}
export target_url


%: ${runtime}/%
	@echo "log: $@: $^"


help:
	@echo "# Usage:"
	@echo "# make runtime=${runtime} start"

LICENSE: /usr/share/common-licenses/MPL-2.0
	cp -a $< $@


node/start: ${example_file} node_modules 
	PORT=${port} node $<

node_modules:
	npm install

start: ${runtime}/start
	@echo "# $@: $^"
