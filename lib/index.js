const getChart = require('./token').getChart;
const getTokenRanking = require('./token_summary').getTokenRanking;
window.getTokenRanking = getTokenRanking;
const queryString = require('query-string');
const Mustache = require('mustache');
console.log('window.location.search', window.location.search)
const parsed = queryString.parse(window.location.search);
console.log('parsed', parsed);
window.parsed = parsed;
const frequent_receiver = '0xa9af49f28fa939aa6d7a9683de9a4319d1d8ecba';

if (location.pathname == '/public/loader.html') {
  console.log('loader')
}else{
  console.log('not loader')
  document.write("<img src='./giphy.gif'></img>");
  getChart(parsed.account || frequent_receiver, function(url){
    var output = Mustache.render("<img src='{{url}}'></img>", {url:url});
    document.open()
    document.write(output);
  })
}
