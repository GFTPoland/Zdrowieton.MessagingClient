(function(window){

    function MessagingClient (config) {

        if (!window.Stomp) {
            throw new Error("Please include stompJS on your page before MessagingClient")
        }

        if (!config) {
            throw new Error("config object not provided to MessagingClient");
        }

        if (!config.appId) {
            throw new Error("config is missing 'appId' property");
        }

        var wsUrl = config.wsUrl || 'ws://zdrowieton.gft.com/zdrowieton-websocket';
        var appId = config.appId.toLowerCase();
        var stompClient = null;
        var topics = {};

        function getWebsocket() {
            if (!window.WebSocket) {
                return new WebSocket(wsUrl.replace(/^http:/i, 'ws:') + '/websocket')
            } else if (window.SockJS) {
                return new SockJS(wsUrl.replace(/^ws:/i, 'http:'))
            } else {
                throw new Error("Browser does not support WS and SockJS was not found")
            }
        }

        function getConnection(callback) {
            if (stompClient) {
                return callback(stompClient);
            } else {
                var socket = getWebsocket();
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
                this.getConnection(callback);
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

    window.MessagingClient = MessagingClient;

    return MessagingClient;

})(window);
