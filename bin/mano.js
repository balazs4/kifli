#! /usr/bin/env node
const { resolve } = require('path');
const args = require('args');
args
  .option('broker', 'MQTT Broker address', 'http://localhost:1883')
  .option('topic', 'MQTT topic to auto-subscription')
  .option('config', 'MQTT.js config object', '');

const params = args.parse(process.argv);

require('../')(
  params['broker'],
  params['topic'],
  params['config']
    ? require(resolve(process.cwd(), params['config']))
    : undefined,
  require(resolve(process.cwd(), args.sub[0])),
  process.exit
);
