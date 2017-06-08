var apiKey = 'AN9EQIRIU7JUFQSKN25J2V37NMMB4DIMVI';
const Web3 = require('web3');

var jQuery = require('jquery');
const Mustache = require('mustache');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
}

var generateUrl = require('./token').generateUrl;
var getBalances = require('./token').getBalances;

function getBalance(address){
  return new Promise(function(resolve,reject){
    web3.eth.getBalance(address, function(err, result){
      resolve(result)
    })
  });
}


function getTransactionHistory(account, cb){
  var view = {
    address: account,
    apiKey:apiKey
  };

  var string = "http://ropsten.etherscan.io/api?module=account&action=txlist&address={{address}}&startblock=0&endblock=99999999&sort=asc&apikey={{apiKey}}";
  var url = Mustache.render(unescape(string), view);

  $.get(url, function( trx ) {
    var logs = trx.result.reverse().map(function(l){
      var value = parseFloat(web3.fromWei(parseInt(l.value)));
      return ({
        value: value,
        block: l.blockNumber,
        from: l.from,
        to: l.to,
        timestamp: new Date(l.timeStamp * 1000)
      })
    })
    cb(logs)
  })
}

function getChart(account, cb){
  getTransactionHistory(account, function(response){
    getBalance(account).then(function(_balance){
      let balance = parseFloat(_balance);
      let data = getBalances(balance, account, response)
      let title = account + ' balance history';
      cb(title, data)
    })
  })
}

module.exports.default = getChart;
module.exports.getChart = getChart;
