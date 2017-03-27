# JS lib for Zdrowieton hackathon

[![Build Status](https://travis-ci.org/GFTPoland/Zdrowieton.MessagingClient.svg?branch=master)](https://travis-ci.org/GFTPoland/Zdrowieton.MessagingClient) [![npm version](https://badge.fury.io/js/zdrowieton.svg)](https://badge.fury.io/js/zdrowieton)

Information about the hackathon itself can be found [here](http://zdrowieton.pl/).

This simple library which enables websocket communication with [server](https://github.com/GFTPoland/Zdrowieton.MessagingServer).

## How to use it?

Create instance:
`var mc = new MessagingClient('http://localhost/');`

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

`npm install`

Open 'index.html' to see sample usage.

There are two versions of lib: with WebSocket and with SockJS.

