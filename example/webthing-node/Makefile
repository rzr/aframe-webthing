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

project?=aframe-webthing-node-example
runtime?=node
example_file?=index.js
property?=level
run_args?=
port?=8888
target_url?=http://localhost:${port}
export target_url

lib_srcs?=$(wildcard *.js lib/*.js | sort | uniq)
srcs?=${lib_srcs}


curl?=curl \
 -H "Accept: application/json" \
 -H "Content-type: application/json" \
 ${curl_args}

sleep_secs?=1


%: ${runtime}/%
	@echo "log: $@: $^"


help:
	@echo "# Usage:"
	@echo "# make runtime=${runtime} start"

node_modules: package.json
	npm install

${example_file}: node_modules
	ls $@

node/start: ${example_file} node_modules
	node $<

LICENSE: /usr/share/common-licenses/MPL-2.0
	cp -a $< $@

property/%:
	${curl} ${target_url}/properties/${@F}
	@echo ""
	${curl} -X PUT -d '{ "${@F}": ${value} }' ${target_url}/properties/${@F}
	@echo ""
	sleep ${sleep_secs}

demo:
	for i in $$(seq 0 100) ; do ${MAKE} property/${property} value=$${i} ; sleep 1 ; done
