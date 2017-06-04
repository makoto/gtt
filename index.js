const token = require('./token');
const queryString = require('query-string');
const Mustache = require('mustache');
console.log('window.location.search', window.location.search)
const parsed = queryString.parse(window.location.search);
console.log(parsed);
// const frequent_receiver = '0xa9af49f28fa939aa6d7a9683de9a4319d1d8ecba';

token(parsed.account, function(url){
  var view = {
    url: url
  };
  var output = Mustache.render("<img src='{{url}}'></img>", view);
  document.write(output);
})
