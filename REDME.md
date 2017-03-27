# JS lib for Zdrowieton hackathon

Information about the hackathon itself can be found [here](http://zdrowieton.pl/).

This simple library which enables websocket communication with [server](https://github.com/GFTPoland/Zdrowieton.MessagingServer).

## How to use it?

Create instance:
`var mc = new MessagingClient('http://localhost/');`

Connecting:

`mc.connect();`

Subscribing:

`mc.subscribe('zdrowieton', function (message) { console.log('Message received', message) });`

Sending messages:

`mc.sendMessage('zdrowieton', 'Hello World!');`

Unsubscribing:

`mc.unsubscribe('zdrowieton');`

Closing connection:

`mc.closeConnection();`

## Running

`npm install`

Open 'index.html' to see sample usage.

There are two versions of lib: with WebSocket and with SockJS.

