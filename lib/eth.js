var apiKey = '';
var account = '';
var api = require('etherscan-api').init(apiKey, 'ropsten')
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:8546')
const web3 = new Web3(provider);

var generateUrl = require('./token').generateUrl;
var getBalances = require('./token').getBalances;

function balanceOf(account){
  return web3.eth.getBalance(account).toNumber()
}

function getTransactionHistory(account, cb){
  api.account.txlist(account)
    .then(function(trx){
      logs = trx.result.reverse().map(function(l){
        var value = parseFloat(web3.fromWei(parseInt(l.value)));
        return ({
          value: value,
          block: l.blockNumber,
          from: l.from,
          to: l.to,
          timestamp: new Date(l.timestamp * 1000)
        })
      })
      cb(logs)
    });
}

function getChart(account, cb){
  getTransactionHistory(account, function(response){
    let balance = parseFloat(web3.fromWei(balanceOf(account)));
    let data = getBalances(balance, account, response).map(function(d){return d.balance}).reverse();
    let title = account;
    cb(generateUrl(title, data))
  })
}

module.exports.default = getChart;
module.exports.getChart = getChart;
