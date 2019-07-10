// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2019-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/#
 */
AFRAME.registerComponent('properties', {
  schema: {
    level: { type: 'number', default: 0},
    on: { type: 'boolean', value: true}
  },

  update: function(old) {
    var properties = this.data;
    for (var property of Object.keys(properties)) {
      switch(property) {
      case "level":
        this.data[property] = (properties[property] / 100 / .5) + .5 ;
        break;
      default:
        this.data[property] = properties[property];
      }
      this.el.object3D.scale.setScalar(this.data.level);
      this.el.setAttribute('color', this.data.on ? 'green' : 'red');
    }
  }
});
