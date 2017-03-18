const log = require('debug')('mano');
const { connect } = require('mqtt');
const { fromEvents } = require('kefir');
const { parse, stringify } = require('./util');

module.exports = async (broker, options) => {
  const client = await new Promise((resolve, reject) => {
    const mqttclient = connect(broker, options);
    mqttclient.on('connect', () => {
      log(`connected to ${broker}...`);
      resolve(mqttclient);
    });
    mqttclient.on('error', () => {
      reject();
    });
  });
  const publish = (topic, message, config = {}) => new Promise(resolve => {
    client.publish(topic, stringify(message), config, () => {
      log(`[${topic}] outgoing message`);
      resolve();
    });
  });
  const subscribe = topic => new Promise(resolve => {
    client.subscribe(topic, () => {
      log(`subscription on ${topic}`);
      const sub$ = fromEvents(client, 'message', (tpc, msg) => ({
        topic: tpc,
        message: parse(msg)
      })).filter(x => x.topic === topic);
      resolve(sub$);
    });
  });
  const { clientId } = options;
  return { publish, subscribe, clientId };
};
