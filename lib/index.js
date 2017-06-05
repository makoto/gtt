const getChart = require('./token').getChart;
const getTokenRanking = require('./token_summary').getTokenRanking;
window.getTokenRanking = getTokenRanking;
window.getChart = getChart;
const queryString = require('query-string');
const Mustache = require('mustache');
console.log('window.location.search', window.location.search)
const parsed = queryString.parse(window.location.search);
console.log('parsed', parsed);
window.parsed = parsed;
const frequent_receiver = '0xa9af49f28fa939aa6d7a9683de9a4319d1d8ecba';
