status.addListener("init", function () {
  return {"text-message": "Welcome to Genesys Token Companion. ʕ•͡ᴥ•ʔ"};
});

status.command({
    name: "leaderboard",
    title: 'SGT token holder leaderboard',
    description: 'Browse SGT token holder leaderboard',
    fullscreen: true,
    params: [{
        name: "account",
        type: status.types.TEXT,
        placeholder: "SGT holding account address"
    }],
    onSend: function(params){
      var url = 'http://localhost:8003/public/leaderboard.html?account=' + params.account
      return {
              title: "Browser",
              dynamicTitle: true,
              singleLineInput: true,
              actions: [ { type: status.actions.FULLSCREEN } ],
              markup: status.components.bridgedWebView(url)
      };
    }
});
