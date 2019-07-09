// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2018-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/
 */
var console = require('console'); // Disable logs here by editing to '!console.log'
var log = console.log || function () {};
var verbose = console.log || function () {};
var webthing = require('webthing-iotjs');


function LevelProperty(thing, name, value, metadata, config) {
  var that = this;
  this.config = config || {};
  webthing.Property.call(this, thing,
                         name || "Level",
                         new webthing.Value(Number(value)), {
                           title: metadata && metadata.title || "Level: ".concat(name),
                           type: 'number',
                           minimum: this.config.minimum || 0,
                           maximum: this.config.maximum || 100,
                           description: metadata && metadata.description || "Level"
                         });
  {
    this.config = config;
    that.value.valueForwarder = function (value) {
      verbose('forward: ' + value);
    };
  }
}

function LevelThing(name, type, description) {
  var that = this;
  webthing.Thing.call(this,
                      name || 'Level',
                      type || [],
                      description || 'A web connected Level');
  {
    this.addProperty(new LevelProperty(this, 'level', 100, {
      description: 'Level'
    }));
  }
}


function App() {
  var that = this;
  this.port = process.argv[3] ? Number(process.argv[3]) : 8888;
  this.url = "http://localhost:".concat(this.port);
  this.server = new webthing.WebThingServer(new webthing.SingleThing(new LevelThing()), this.port);
  process.on('SIGINT', function () {
    that.server.stop();
  });
  console.log(this.url);
  this.server.start();
}

if (module.parent === null) {
  App()
}
