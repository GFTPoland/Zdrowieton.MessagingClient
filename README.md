# Zdrowieton.MessagingClient

JS library providing websocket communication for Zdrowieton hackathon.

[![Build Status](https://travis-ci.org/GFTPoland/Zdrowieton.MessagingClient.svg?branch=master)](https://travis-ci.org/GFTPoland/Zdrowieton.MessagingClient) [![npm version](https://badge.fury.io/js/zdrowieton.svg)](https://badge.fury.io/js/zdrowieton)

Information about the hackathon itself can be found [here](http://zdrowieton.pl/).

This simple library which enables websocket communication with [server](https://github.com/GFTPoland/Zdrowieton.MessagingServer).

## Installation

Just install it using NPM:

`npm install zdrowieton`

and then require it in your app:

`var ZdrowietonMessagingClient = require('zdrowieton')`

If you don't use a module bundler like Browserify or Wwebpack, then download this repo and include `zdrowietonMessagingClient.js` in your HTML file. Remember to include stomp-js dependency as well!

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.0.0/sockjs.min.js"></script>
<script src="zdrowietonMessagingClient.js"></script>`
```

## Usage

First create an instance:

`var mc = new ZdrowietonMessagingClient(config);`

Where `config` is an configurartion with following keys:
- `appId` [string, required] - your unique application ID
- `wsUrl` [string, optional] - a URL of the alternative WebSocket server

####  Connecting 

not required, subscribe and sendMessage automatically connects to server

`mc.connect();`

#### Subscribing to messaged:

`mc.subscribe(topicName, function callback(message) { ... });`

#### Sending messages:

`mc.sendMessage(topicName, message);`

A `message` can a `string`, `Array` or an `Object`, which will be serialized to JSON automatically

#### Unsubscribing:

`mc.unsubscribe(topicName);`

#### Closing connection:

`mc.closeConnection();`

## Usage examples

Check `example-browser.html` or `example-node.js` for sample usage.
