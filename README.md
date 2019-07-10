# AFRAME-WEBTHING #

[![GitHub forks](https://img.shields.io/github/forks/rzr/aframe-webthing.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/rzr/aframe-webthing/network/)

## USAGE: ##

```sh
make -C example/webthing-iotjs start
#| node index.js
#| http://localhost:8888

make -C example/webthing-iotjs demo
#| curl -H "Accept: application/json" -H "Content-type: application/json"  http://localhost:8888/properties/level
#| {"level":100}

make start
#| PORT=8880 node index.js
#| Your app is listening on port 8880

x-www-browser http://localhost:8880?verbose=yes&useWs=no
```

## RESOURCES: ##

* <http://rzr.github.io/aframe-webthing>
* <https://purl.org/aframe-webthing>
