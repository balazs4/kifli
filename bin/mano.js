#! /usr/bin/env node
const { resolve } = require('path');
const args = require('args');
args
  .option('broker', 'MQTT Broker address', 'http://localhost:1883')
  .option('config', 'MQTT.js config object', '');

const params = args.parse(process.argv);
const handlerFile = resolve(process.cwd(), args.sub[0]);

require('../')(params['broker'], require(handlerFile), process.exit);
