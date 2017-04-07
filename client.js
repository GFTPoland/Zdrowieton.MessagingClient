var Client = (function(window) {

    var url = 'http://zdrowieton.gft.com/zdrowieton-websocket';

    function isObject(obj) {
        return obj === Object(obj);
    }

    function isArray(obj) {
        return Array.isArray(obj)
    }
    
    function stringify(payload) {
        if (isObject(payload) || isArray(payload)) {
            return JSON.stringify(payload);
        } else {
            return payload;
        }
    }

    function Client(appId, clientId) {
        this.clientId = clientId || Math.random().toString(16).slice(2);
        this.subscribe = "/topic/" + appId.toLowerCase();
        this.send = "/send/" +  appId.toLowerCase();
    }

    Client.prototype = {

        connect: function() {

            var ws = new SockJS(url);
            var client = this.client = Stomp.over(ws);
            client.heartbeat.outgoing = 1000;
            return new Promise(function(resolve, reject) {

                client.connect({}, function(frame) {
                    client.subscribe(this.subscribe + "#users", function(msg) {
                        console.log("New joiner", JSON.parse(msg.body).clientId);
                    });
                    client.send(this.send + "#users", {}, JSON.stringify({"clientId": this.clientId}));
                    resolve(frame);

                }.bind(this), function(err) {
                    reject(err)
                });

            }.bind(this));


        },

        broadcast: function(message) {
            return this.connect().then(function(){
                message.clientId = this.clientId;
                this.client.send(this.topic, {}, stringify(message));
            }.bind(this))
        },

        _onConnectSuccess: function(frame) {

        },

        _onConnectFailure: function() {

        }


    };

    return Client;

})(window);

var client = new Client("MY_SUPER_APP");

client.connect();

/*
    client.connect();

    client.send(roomName, message);

    client.

    client.
 */


