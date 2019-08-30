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

AFRAME.registerComponent('webthing', {
  schema: {
    url: { type: 'string', default: 'http://localhost:8888' },
    wsUrl: { type: 'string', default: 'ws://localhost:8888' },
    bearer: { type: 'string', default: '' },
    properties: { type: 'string', default: 'properties'},
    pause: { type: "string", default: 'no' },
    useWs: { type: "string", default: 'yes' },
    refresh: {type: "string", default: "1000" },
    verbose: {type: "string", default: "no" },
    persist: {type: "string", default: "no" },
    settings: {type: "string", default: ""}
  },
  init: function() {
    var that = this;

    function verbose(arg)
    {
      if (that.data.verbose === 'yes') {
        console.log(arg);
      }
    }

    function update(properties)
    {
      verbose('aframe-webthing.update: ');
      document.title = JSON.stringify(properties);
      if (that.data.properties && that.data.properties.length) {
        for (var property of Object.keys(properties)) {
          that.el.setAttribute(that.data.properties, property, properties[property]);
        }
      }
    }

    function query()
    {
      verbose('aframe-webthing.query');
      var url = `${that.data.url}/properties`;
      verbose(`log: fetch: ${url}`);
      let headers = {
        Accept: 'application/json'
      };
      if (that.data.bearer) {
        headers['Authorization'] = `Bearer ${that.data.bearer}`;
      }
      verbose(headers);
      fetch(url, { headers: headers } )
        .then((response) => {
          return response.json();
        }, (reason) => {
          console.error(reason);
        })
        .then((json) => {
          verbose(`log: payload: ${JSON.stringify(json)}`);
          update(json);
        })
        .catch((err) => {
          console.error(err);
          if (that.data.settings && that.data.settings.length)
            window.location.href =  that.data.settings;
        });
    }

    function poll(delay)
    {
      if (!delay) {
        delay = that.data.refresh;
      }
      verbose(`log: loop: waiting delay: ${delay}`);
      that.interval = setInterval(() => {
        if (that.data.pause === 'yes') {
          verbose(`log: stopping: ${that.data.pause}`);
          toggle(false);
        }
        query();
      }, Number(delay));
    }

    function start()
    {
      query();
      let useWebsockets = ("WebSocket" in window) && (that.data.useWs === 'yes');
      if (useWebsockets) {
        let wsUrl = that.data.wsUrl;
        if (that.data.bearer && that.data.bearer.length)
          wsUrl += `?jwt=${that.data.bearer}`;
        verbose(wsUrl);
        that.ws = new WebSocket(wsUrl);
        let ws = that.ws;
        ws.onclose = function (evt) {
          /// CLOSE_ABNORMAL
          if (evt.code === 1006) {
            poll();
          }
        }
        ws.onmessage = function (evt) {
          verbose(evt);
          if (that.data.pause === 'yes') {
            that.ws.close();
          }
          update(JSON.parse(evt.data).data);
        }
      } else {
        if (that.ws) {
          that.ws.close();
        }
        poll();
      }
    }

    function toggle(status)
    {
      if (status) {
        start();
      } else {
        if (that.ws) {
          that.ws.close();
          that.ws = null;
        }
        if (that.interval) {
          clearInterval(that.interval);
          that.interval = null;
        }
      }
    }
  
    //TODO: Overloading from Local storage (to relocate elsewhere)
    if (document.location.search) {
      let searchParams = null;
      searchParams = (new URL(document.location)).searchParams;
      if (searchParams) {
        for (let entry of searchParams.entries()) {
          that.data[entry[0]] = entry[1];
        }
      }
      if (that.data['persist'] === 'yes') {
        for (let entry of searchParams.entries()) {
          localStorage[entry[0]] = entry[1];
        }
      }
      window.history.pushState(null, null, window.location.pathname);
    }               
    if (that.data['persist'] === 'yes') {
      let el = document.getElementById(that.data.properties);
      for (let key of Object.keys(localStorage)) {
        if (that.data[key] != undefined) {
          that.el.setAttribute('webthing', key, localStorage[key]);
        }
      }
    }
    verbose('log: Starting');
    verbose(this.data);
    toggle(this.data.pause === 'no');
  },
  update: function(old) {
    verbose('controler.update');
  }
});
