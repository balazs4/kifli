# kifli

[![Build Status](https://travis-ci.org/balazs4/kifli.svg?branch=master)](https://travis-ci.org/balazs4/kifli)
[![Coverage Status](https://coveralls.io/repos/github/balazs4/kifli/badge.svg?branch=master)](https://coveralls.io/github/balazs4/kifli?branch=master)
[![npm version](https://badge.fury.io/js/kifli.svg)](https://badge.fury.io/js/kifli)
[![dependencies Status](https://david-dm.org/balazs4/kifli/status.svg)](https://david-dm.org/balazs4/kifli)
[![devDependencies Status](https://david-dm.org/balazs4/kifli/dev-status.svg)](https://david-dm.org/balazs4/kifli?type=dev)

> nano library to handle messages sent throught MQTT protocol. It wraps the [mqtt.js](https://github.com/mqttjs/MQTT.js) module

## Motivation

I wanted to create a very lightweight message handler on the top of MQTT.
The main goal of this module is to use the power of the MQTT pub/sub model to create sort of **chainable** nanoservices without too much boilerplate.

Highly inspired by [zeit/micro](https://github.com/zeit/micro) and [developit](https://github.com/developit).


## Usage

+ ``yarn add kifli``
+ add the following script to your ``package.json``

````json
{
  "scripts": {
    "start": "kifli handler.js --broker http://localhost:1883 --topic '/sum' "
  }
}
````

+ create a ``handler.js`` file

````javascript
// handler.js

module.exports = ({ publish }) => async ({ topic, payload }) => {
  await publish('/sum/result', {result: payload.a + payload.b});
};

// the handler is automatically subscribed to the /sum topic
// assume that this topic always recevies two numbers (a and b) which shall be sumed
// the handler does its job and publish the result to a /sum/result topic
// imagine you have a handler which is listening to the /sum/result topic...

````


## TODO

+ [ ] mqtt config object
+ [ ] API description
+ [ ] more example
