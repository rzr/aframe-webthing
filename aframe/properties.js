// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2018-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/#
 */
AFRAME.registerComponent('properties', {
  schema: {
    level: { type: 'number', default: 0},
  },

  update: function(old) {
    console.log('log: level.update');
    var properties = this.data;
    for (var property of Object.keys(properties)) {
      switch(property) {
      case "level":
        this.level = (properties[property] / 100 / 4) + .25 ;
        break;
      }
      var el = document.getElementById(property);
      if (!el || !el.object3D)
        throw "Null: " + property;
      el.object3D.scale.set(this.level, this.level, this.level);
    }
  }
});
