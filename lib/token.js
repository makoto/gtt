const token_address = '0x4bda828f1fe628973c39366263b78b7cd9d6d8fe'; // sgt
const frequent_receiver = '0xa9af49f28fa939aa6d7a9683de9a4319d1d8ecba';
const abi = require('human-standard-token-abi');
const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  console.log('found')
  web3 = new Web3(web3.currentProvider);
} else {
  console.log('not found')
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
}

const Token = web3.eth.contract(abi)
const token = Token.at(token_address)
const one_month_ago = 874999

function getBalance(address){
  return new Promise(function(resolve,reject){
    return token.balanceOf.call(address, function(err, result){
      return resolve(result)
    })
  });
}

function getBalances(balance, account, array){
  let initial_balance = balance;
  let result = array.map(function(a){
    var obj = {
      balance:balance,
      value: a.value,
      from: a.from,
      to: a.to,
      timestamp: a.timestamp,
      block:a.block
    }
    if (account == obj.to) {
      balance-= a.value;
    }else{
      balance+= a.value;
    }
    return obj;
  })
  result.unshift({
    balance:initial_balance,
    timestamp: new Date()
  })
  return result;
}

function getTransactionHistory(account, cb){
  token
    .Transfer({_to:account},{fromBlock:one_month_ago})
    .get(function(error, logs){
      // promised_logs = logs.map((l) =>{
      //   console.log('l', l.blockNumber)
      //   return new Promise((resolve, reject) => {
      //     console.log('on promise')
      //     web3.eth.getBlock(l.blockNumber, (error,block) =>{
      //       console.log('l, block', l, block)
      //       resolve(1)
      //     })
      //   });
      // })

      promised_logs = logs.map(l => {
        return new Promise(function(fulfilled, rejected){
          console.log('n', l);
          web3.eth.getBlock(l.blockNumber, (error,block) =>{
            console.log('l, block', l, block)
            return fulfilled([l, block])
          })
        })
      })
      Promise.all(promised_logs).then((values) => {
        logs = values.reverse().map(function(value){
          l = value[0]
          block = value[1]
          return ({
            value: l.args._value.toNumber(),
            block: l.blockNumber,
            from: l.args._from,
            to: l.args._to,
            timestamp: new Date(block.timestamp * 1000)
          })
        })
        cb(logs)
      });
    });
}

function generateUrl(title, data){
  url = 'https://image-charts.com/chart?chs=500x190';
  url+= '&chd=t:' + data.join();
  url+= '&chds=a&cht=lc&chtt=' + title;
  return url
}

function getChart(account, cb){
  getTransactionHistory(account, function(response){
    getBalance(account).then(function(balance){
      let data = getBalances(balance, account, response)
      token.symbol.call((err, symbol)=>{
        title = symbol + ' balance for the last one month';
        cb(title, data);
      })
    })
  })
}

module.exports.default = getChart;
module.exports.getTransactionHistory = getTransactionHistory;
module.exports.getBalances = getBalances;
module.exports.getChart = getChart;
module.exports.generateUrl = generateUrl;

// getTransactionHistory = require('./lib/token').getTransactionHistory;
// account = '';
// getTransactionHistory(account, function(r){console.log(r)})
