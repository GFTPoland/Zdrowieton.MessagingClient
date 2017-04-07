var Client = require("./zdrowietonMessagingClient");
var SockJS = require("sockjs-client");

var client = new Client({
    appId: "zdrowieton_mc_demo",
    ws: SockJS,
    wsUrl: "http://zdrowieton.gft.com/zdrowieton-websocket"
});

client.connect(function(){

    console.log("Connection to socket OK...");

    // Subscribing for messages
    client.subscribe("zdrowieton", function(message) {
        console.log(">", "zdrowieton:", message)
    });

    // Sending some random messages
    setInterval(function(){
        var rnd = Math.random();
        client.sendMessage("zdrowieton", "my random number is " + rnd);
    }, 2000);

});



