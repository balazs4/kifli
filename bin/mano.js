#! /usr/bin/env node
const { resolve, parse } = require('path');
const args = require('args');
args
  .option('broker', 'MQTT Broker address', 'http://localhost:1883')
  .option('topic', 'MQTT topic to auto-subscription');

const params = args.parse(process.argv);
const file = args.sub[0];

require('../')(
  params['broker'],
  params['topic'],
  { clientId: `${parse(file).name}_${process.pid}` },
  require(resolve(process.cwd(), file)),
  process.exit
);
