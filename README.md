# AFRAME-WEBTHING #

[![GitHub forks](https://img.shields.io/github/forks/rzr/aframe-webthing.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/rzr/aframe-webthing/network/)
[![license](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](LICENSE)
[![NPM](https://img.shields.io/npm/v/aframe-webthing.svg)](https://www.npmjs.com/package/aframe-webthing)
[![IRC Channel](https://img.shields.io/badge/chat-on%20freenode-brightgreen.svg)](https://kiwiirc.com/client/irc.freenode.net/#tizen)

## ABOUT: ##

AFrame-Webthing is a webcomponent that bind properties of physical devices to virtual models.

[![aframe-webthing](https://image.slidesharecdn.com/aframe-webthing-20190710-190710195750/95/aframewebthing20190710-27-638.jpg)](https://speakerdeck.com/rzr/aframe-webthing-20190710rzr# "aframe-webthing")


## USAGE: ##

As reference example we'll use simulator devices from webthing SDK,
but it's mosty same if deployed on actual devices,
check resources chapter for more details.


### USING IOT.JS: ###

```sh
make -C example/webthing-iotjs start &
#| node index.js
#| http://localhost:8888

#| Ctrl+C
bg

make -C example/webthing-iotjs demo
#| curl http://localhost:8888/properties
#| {"on":true, "level":42}

x-www-browser './example/aframe/index.html?verbose=yes'
```

### USING NODE.JS: ###

```sh
make -C example/webthing-node start &
#| node index.js
#| http://localhost:8888

#| Ctrl+C
bg


make -C example/webthing-node demo
#| curl http://localhost:8888/properties
#| {"on":true, "level":42}

make start
#| PORT=8880 node index.js
#| Your app is listening on port 8880

x-www-browser 'http://localhost:8880?verbose=yes&useWs=no'

# Or you could use a public server (on http):
x-www-browser 'http://rzr.github.io/aframe-webthing?useWs=no&verbose=yes'
```

### XR FROM THE WEB: ###

For our developement purposes we used local filesystem (file:// scheme),
but for more advanced scenes, hosting on the web (on http) is also possible.

```sh
make start
#| PORT=8880 node index.js
#| Your app is listening on port 8880

x-www-browser 'http://localhost:8880/example/aframe/?verbose=yes&useWs=no'

# Or you could use a public server (on http):
x-www-browser 'http://rzr.github.io/aframe-webthing?useWs=no&verbose=yes' 
```
URL can be accesed from VR Headset like GearVR,
just type the URL from SamsungInternet in VR mode (aka sVRbrowser).


## SUPPORT: ##

* Samsung Internet on GearVR (sVRbrowser)
* MagicLeap ML1 OS Version 0.96.1. ML Helio 0.5.5

[![#aframe-webthing-0.0.2
](https://pbs.twimg.com/media/EAaIYzvXUAAq73_?format=jpg&name=small)
](https://twitter.com/utopiah/status/1154760317546762240#aframe-webthing-0.0.2#
"aframe-webthing-0.0.2")


## RESOURCES: ##

* <http://rzr.github.io/aframe-webthing>
* <https://purl.org/aframe-webthing>
* <https://www.npmjs.com/package/twins>
* <https://en.wikipedia.org/wiki/Digital_twin>
* <https://github.com/rzr/webthing-iotjs/wiki/IotJs>
* <https://github.com/rzr/webthing-iotjs/wiki/XR>
* <https://github.com/rzr/webthing-iotjs/wiki/DigitalTwins>
* <https://github.com/mozilla-iot/webthing-node/pull/108>
