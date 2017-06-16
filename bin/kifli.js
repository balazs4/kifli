#! /usr/bin/env node
const { resolve, parse, join } = require('path');
const args = require('args');
const { name, main } = require('../package.json');

args
  .option('broker', 'MQTT Broker address', 'mqtt://localhost:1883')
  .option('topic', 'MQTT topic with auto-subscription');

const params = args.parse(process.argv);
const file = args.sub[0];
const kifli = require(join('..', main));

const start = async (broker, topic, config, listener) => {
  const client = await kifli(broker, config);
  const topic$ = await client.subscribe(topic);
  topic$.onValue(listener(client));
};

const createOptions = (o = {}) =>
  Object.assign(
    {},
    {
      clientId: [`${name}`, `${parse(file).name}`, `${process.pid}`].join('/')
    },
    o
  );

start(
  params['broker'],
  params['topic'],
  createOptions(),
  require(resolve(process.cwd(), file))
);
