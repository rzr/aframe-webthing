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

project?=aframe-webthing-iotjs-example
runtime?=iotjs
example_file?=index.js
property?=level
run_args?=
port?=8888
target_url?=http://localhost:${port}
export target_url

lib_srcs?=$(wildcard *.js lib/*.js | sort | uniq)
srcs?=${lib_srcs}

iotjs_modules_dir?=${CURDIR}/iotjs_modules

webthing-iotjs_url?=https://github.com/rzr/webthing-iotjs
webthing-iotjs_revision?=webthing-iotjs-0.12.0
webthing-iotjs_dir?=${iotjs_modules_dir}/webthing-iotjs
iotjs_modules_dirs+=${webthing-iotjs_dir}

deploy_modules_dir?=${CURDIR}/tmp/deploy/iotjs_modules
deploy_module_dir?= ${deploy_modules_dir}/${project}
deploy_dirs+= ${deploy_module_dir}
deploy_dirs+= ${deploy_modules_dir}/webthing-iotjs
deploy_srcs+= $(addprefix ${deploy_module_dir}/, ${srcs})

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

iotjs/start: ${example_file} ${iotjs_modules_dirs}
	iotjs $< ${run_args}

iotjs/modules: ${iotjs_modules_dirs}
	ls $<

${webthing-iotjs_dir}/%: ${iotjs_modules_dirs}
	ls $@

${example_file}: ${webthing-iotjs_dir}/example/single-thing.js ${iotjs_modules_dirs}
	sed 's|brightness|level|g' < $< > $@

iotjs/client:
	curl -i ${target_url}
	curl -i ${target_url}/properties

iotjs/client/web:
	curl -i ${webthing_url}
	curl -i ${webthing_url}/properties

node_modules: package.json
	npm install

node/start: ${example_file} node_modules
	node $<

deploy: ${deploy_srcs} ${deploy_dirs}
	ls $<

LICENSE: /usr/share/common-licenses/MPL-2.0
	cp -a $< $@

${webthing-iotjs_dir}: Makefile
	rm -rf -- "$@/../webthing-iotjs"
	git clone --recursive --depth 1 ${webthing-iotjs_url} -b ${webthing-iotjs_revision} $@
	make -C $@ deploy deploy_modules_dir=${iotjs_modules_dir}

${deploy_module_dir}/%: %
	@echo "# TODO: minify: $< to $@"
	install -d ${@D}
	install $< $@

${deploy_modules_dir}/webthing-iotjs: ${iotjs_modules_dir}/webthing-iotjs
	make -C $< deploy deploy_modules_dir="${deploy_modules_dir}"


property/%:
	${curl} ${target_url}/properties/${@F}
	@echo ""
	${curl} -X PUT -d '{ "${@F}": ${value} }' ${target_url}/properties/${@F}
	@echo ""
	${curl} ${target_url}/properties
	@echo ""
	sleep ${sleep_secs}

demo:
	for i in $$(seq 0 100) ; do ${MAKE} property/${property} value=$${i} ; sleep 1 ; done
