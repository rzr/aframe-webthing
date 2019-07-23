# AFRAME-WEBTHING #

[![GitHub forks](https://img.shields.io/github/forks/rzr/aframe-webthing.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/rzr/aframe-webthing/network/)

[![aframe-webthing](https://image.slidesharecdn.com/aframe-webthing-20190710-190710195750/95/aframewebthing20190710-27-638.jpg)](https://speakerdeck.com/rzr/aframe-webthing-20190710rzr# "aframe-webthing")


## USAGE: ##

```sh
make -C example/webthing-iotjs start
#| node index.js
#| http://localhost:8888

make -C example/webthing-iotjs demo
#| curl http://localhost:8888/properties
#| {"on":true, "level":42}

make start
#| PORT=8880 node index.js
#| Your app is listening on port 8880

x-www-browser http://localhost:8880?verbose=yes&useWs=no

# Or you could use a public server (on http):
x-www-browser 'http://rzr.github.io/aframe-webthing?useWs=no&verbose=yes' 
```


## RESOURCES: ##

* <http://rzr.github.io/aframe-webthing>
* <https://purl.org/aframe-webthing>
* <https://github.com/mozilla-iot/webthing-node/pull/108>
