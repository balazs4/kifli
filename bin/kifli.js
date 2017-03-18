#! /usr/bin/env node
const { resolve, parse, join } = require('path');
const args = require('args');
const { name, main } = require('../package.json');

const start = async (broker, topic, config, listener) => {
  const client = await kifli(broker, config);
  const topic$ = await client.subscribe(topic);
  topic$.onValue(listener(client));
};

args
  .option('broker', 'MQTT Broker address', 'http://localhost:1883')
  .option('topic', 'MQTT topic to auto-subscription');

const params = args.parse(process.argv);
const file = args.sub[0];
const kifli = require(join('..', main));

start(
  params['broker'],
  params['topic'],
  { clientId: [`${name}`, `${parse(file).name}`, `${process.pid}`].join('/') },
  require(resolve(process.cwd(), file))
);
