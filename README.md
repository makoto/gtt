# Genesis Token Tracker (GTT)

<img width="50%" src="./gtc.png"></img>

Genesis token tracker(GTT) allows you to keep track of the token allocation of Status Genesis Token (symbol: SGT), an ERC20 token, which will be redeemable for Status Network Tokens (‘SNT’ — also an ERC20 token) when the Network is fully launched.

## Why GTT?

From [Encoding the Status ‘Genesis Block’](https://blog.status.im/encoding-the-status-genesis-block-d73d287a750)

```
The value that lies within this Network isn’t money, but in thought and actions of the wonderful people of the Ethereum community, those who have shaped not only Status but who I am as well. They are the ones who truly believe in trustless, permissionless and decentralized systems, and what gives web3 meaning. They’ve done so with lengthy discussions, feedback and critiques, contributing to our development and the development of Ethereum, and even by doing community outreach — all these actions have value. But quantifying it is hard, so we intend to do this with our own subjectivity, and establish a web-of-trust.
```

SGT tokens are awarded to community members and all its transaction history are recorded into Ethereum  [mainnet](https://etherscan.io/token/0xd248b0d48e44aaf9c49aea0312be7e13a6dc1468)  

The immutable contribution history gives a fair and open competition among would be community members. What's missing is a handy app to make their activities more visual and transparent, this is where GTT comes in.

With GTT, users can

- see the leaderboard of high token earning people.
- see where user stands in terms of token balance relative to other people via histogram.
- peek through the transaction history of token earnings as well as how they spend/earn eth.

GTT is probably the only dapp&bott which gives you the real value despite the fact that status.im is currently running under testnet. This is thanks to Status.im team keeping track the same transaction history on [testnet](https://ropsten.etherscan.io/token/0x4bda828f1fe628973c39366263b78b7cd9d6d8fe).

## Demo video

- WIP

## Available commands

| command     | usage |
|--- | --- |
| leaderboard | list top 10 token earning accounts |
| token_distribution | shows token distribution histogram |
| your_eth | shows your eth balance as a line chart |
| your_tokens | shows your token balance as a line chart |

## Todo

- add link

## Dev guide

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
