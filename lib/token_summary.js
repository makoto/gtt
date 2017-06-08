token_address = '0x4bda828f1fe628973c39366263b78b7cd9d6d8fe';
const abi = require('human-standard-token-abi');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider);
const Token = web3.eth.contract(abi);
const token = Token.at(token_address);
current_block =  web3.eth.blockNumber;
one_month_ago = 874999;

function aggregate(data){
  let participants = {}
  data.map(function(r){
    if(participants[r.args._to]){
      participants[r.args._to].push(r.args);
    }else{
      participants[r.args._to] = [r.args];
    }
  })

  var rankings = []
  for (var i = 0; i < Object.keys(participants).length; i++) {
    var key = Object.keys(participants)[i]
    var values = participants[key].map(function(r){return r._value.toNumber() });
    var sum = values.reduce((a, b) => a + b, 0);
    rankings.push({
      key:key,
      sum:sum,
      values:values,
    })
  }
  var sorted = rankings.sort(function(a,b){return a.sum - b.sum }).reverse();
  return sorted
}

function getAllEvents(cb){
  tokenEvent = token.Transfer({},{fromBlock:one_month_ago})
  tokenEvent.get(function(error, logs){
    cb(aggregate(logs));
  });
}

function getTokenRanking(limit, account, cb){
  var tops = []
  getAllEvents(function(sorted){
    if (limit == null){
      limit = sorted.length
    }

    for (var i = 0; i < limit; i++) {
      console.log(i+1, sorted[i].sum, sorted[i].values.length)
      tops.push({key:sorted[i].key, rank:i+1, sum:sorted[i].sum, length: sorted[i].values.length});
    }
    var your_rank = null;
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].key == account) {
        your_rank = {key:account, rank:i+1, sum:sorted[i].sum, length: sorted[i].values.length};
        break;
      }
    }
    cb({
      tops:tops,
      your_rank: your_rank
    })
  })
}

module.exports.getTokenRanking = getTokenRanking;
// getTokenRanking = require('./lib/token_summary').getTokenRanking
// account = '';
// getTokenRanking(account, function(r){console.log(r)});
//  all['tops'].map(function(d){return [d.key, d.sum]}
