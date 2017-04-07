(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['stompjs'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('stompjs'));
    } else {
        root.MessagingClient = factory(root.Stomp);
    }
}(this, function (Stomp) {

    var global = Function('return this')();

    function MessagingClient (config) {

        if (!Stomp) {
            throw new Error("StompJS dependency is missing!")
        }

        if (!config) {
            throw new Error("config object not provided to MessagingClient");
        }

        if (!config.appId) {
            throw new Error("config is missing 'appId' property");
        }

        var WS = config.ws || global.WebSocket;

        if (!WS) {
            throw new Error("No support for native WebSockets detected. Please provide other implementation (for example SockJS) via config.ws")
        }

        var wsUrl = config.wsUrl || 'ws://zdrowieton.gft.com/zdrowieton-websocket/websocket';
        var appId = config.appId.toLowerCase();
        var stompClient = null;
        var topics = {};

        function getConnection(callback) {
            if (stompClient) {
                return callback(stompClient);
            } else {
                var socket = new WS(wsUrl);
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function () {
                    callback(stompClient);
                }, function (error) {
                    console.log(error);
                    stompClient = null;
                });
            }
        }

        function getSendDest(name) {
            return '/send/' + appId + '_' + name
        }

        function getSubscribeDest(name) {
            return '/topic/' + appId + '_' + name
        }

        return {
            connect: function (callback) {
                getConnection(callback);
            },
            subscribe: function (topicName, callback) {
                getConnection(function (stompClient) {
                    topics[topicName] = stompClient.subscribe(getSubscribeDest(topicName), function (message) {
                        callback(message.body);
                    });
                });
            },
            unsubscribe: function (topicName) {
                var topic = topics[topicName];
                if (topic && topic.unsubscribe) {
                    topic.unsubscribe();
                    delete topic[topicName];
                }
            },
            sendMessage: function (topicName, message) {
                getConnection(function (stompClient) {
                    stompClient.send(getSendDest(topicName), {}, message);
                });
            },
            closeConnection: function () {
                if (stompClient !== null) {
                    stompClient.disconnect();
                    stompClient = null;
                    topics = {};
                }
            }
        }
    }

    return MessagingClient;

}));



