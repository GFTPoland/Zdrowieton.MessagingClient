var ZdrowietonMessagingClient = require("./zdrowietonMessagingClient");
var SockJS = require("sockjs-client");

var mc = new ZdrowietonMessagingClient({
    appId: "zdrowieton_mc_demo",
    ws: SockJS,
    wsUrl: "http://zdrowieton.gft.com/zdrowieton-websocket"
});

mc.connect(function(){

    console.log("Connection to socket OK...");

    // Subscribing for messages
    mc.subscribe("zdrowieton", function(message) {
        console.log(">", "zdrowieton:", message)
    });

    // Sending some random messages
    setInterval(function(){
        var rnd = Math.random();
        mc.sendMessage("zdrowieton", "my random number is " + rnd);
    }, 2000);

});
