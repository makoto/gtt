# Genesys Token Companion Dapp&Bot

## What is this?

This is your companion to guide you through the world of genesis tokens.

## Demo

[INSERT YOUTUBE VIDEO]


## Available functions

- welcome message

## Usage

### Startup server

```
// builds dapps
npm run build
// builds bot
npm run build_bot
// Make sure you use rospen testnet as some token addresses are hard coded.
geth --testnet ...
// start server
python -m SimpleHTTPServer 8003
```

### Connect local devices

Only tested on Android device against mac.


```
$ status-dev-cli scan
Searching for connected devices...
Status Android (192.168.xxx.xxx)
$ export DEVICE_IP=192.168.xxx.xxx

$ adb forward tcp:5561 tcp:5561
$ adb reverse tcp:8003 tcp:8003
$ adb reverse tcp:8546 tcp:8546
```

// add app
```
$ status-dev-cli add '{"whisper-identity": "GTC",  "name": "Genesys Token Companion", "bot-url": "http://localhost:8003/bots/welcome.js"}' --ip $DEVICE_IP
status-dev-cli remove '{"whisper-identity": "GTC",  "name": "Genesys Token Companion", "bot-url": "http://localhost:8003/bots/welcome.js"}' --ip $DEVICE_IP
````
