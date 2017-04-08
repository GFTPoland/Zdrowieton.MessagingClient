(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['stompjs', 'sockjs-client'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('stompjs'), require('sockjs-client'));
    } else {
        root.MessagingClient = factory(root.Stomp, root.SockJS);
    }
}(this, function (Stomp, SockJS) {

    var global = Function('return this')();

    function MessagingClient (config) {

        if (!Stomp && !global.SockJS) {
            throw new Error("StompJS dependency is missing!")
        }

        if (!SockJS && !global.SockJS) {
            throw new Error("SockJS dependency is missing!")
        }

        if (!config) {
            throw new Error("config object not provided to MessagingClient");
        }

        if (!config.appId) {
            throw new Error("config is missing 'appId' property");
        }

        var wsUrl = config.wsUrl || 'http://vps390375.ovh.net:8080/zdrowieton-websocket';
        var appId = config.appId.toLowerCase();
        var stompClient = null;
        var topics = {};

        function getConnection(callback) {
            if (stompClient) {
                return callback(stompClient);
            } else {
                var socket = new SockJS(wsUrl);
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

        function parse(payload) {
            var data;
            try {
                data = JSON.parse(payload);
            } catch (e) {
                data = payload;
            }
            return data;
        }

        return {
            connect: function (callback) {
                getConnection(callback);
            },
            subscribe: function (topicName, callback) {
                getConnection(function (stompClient) {
                    topics[topicName] = stompClient.subscribe(getSubscribeDest(topicName), function (message) {
                        callback(parse(message.body));
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
                    stompClient.send(getSendDest(topicName), {}, stringify(message));
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
