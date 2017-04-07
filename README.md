# JS lib for Zdrowieton hackathon

[![Build Status](https://travis-ci.org/GFTPoland/Zdrowieton.MessagingClient.svg?branch=master)](https://travis-ci.org/GFTPoland/Zdrowieton.MessagingClient) [![npm version](https://badge.fury.io/js/zdrowieton.svg)](https://badge.fury.io/js/zdrowieton)

Information about the hackathon itself can be found [here](http://zdrowieton.pl/).

This simple library which enables websocket communication with [server](https://github.com/GFTPoland/Zdrowieton.MessagingServer).

## How to use it?

Create instance:
`var mc = new MessagingClient(config);`

Where config is an object with following keys:
- `appId` [string, required] - your unique application ID, used in all your client using MessagingClient
- `wsUrl` [string] - address of WS server, defaults to *http://zdrowieton.gft.com/zdrowieton-websocket*

Connecting (not required, subscribe and sendMessage automatically connects to server):

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

`npm install zdrowieton`

Open 'index.html' to see sample usage.

If your browser does not support native WebSockets, you must include [SockJS](https://github.com/sockjs/sockjs-client) on your page.

