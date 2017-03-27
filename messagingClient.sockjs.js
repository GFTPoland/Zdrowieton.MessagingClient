
function MessagingClient (serverAddress) {

    var stompClient = null;

    var topics = {};

    function getConnection(callback) {
        if (stompClient) {
            return callback(stompClient);
        } else {
            var socket = new SockJS((serverAddress || '') + '/zdrowieton-websocket');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                callback(stompClient);
            }, function (error) {
                console.log(error);
                stompClient = null;
            });
        }
    }

    return {
        connect: function (callback) {
            this.getConnection(callback);
        },
        subscribe: function (topicName, callback) {
            getConnection(function (stompClient) {
                topics[topicName] = stompClient.subscribe('/topic/' + topicName, function (message) {
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
                stompClient.send('/send/' + topicName, {}, message);
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
