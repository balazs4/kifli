const log = require('debug')('mano');
const { connect } = require('mqtt');
const { fromEvents } = require('kefir');
const { parse, stringify } = require('./util');

module.exports = async (broker, options) => {
  const client = await new Promise((resolve, reject) => {
    const mqttclient = connect(broker, options);
    mqttclient.on('connect', () => {
      log(`[ONLINE] ${broker}`);
      resolve(mqttclient);
    });
    mqttclient.on('error', () => {
      reject();
    });
    mqttclient.on('offline', () => {
      log(`[CLOSED] ${broker}`);
    });
    mqttclient.on('close', () => {
      log(`[OFFLINE] ${broker}`);
    });
  });

  const publish = (topic, message, config = { qos: 0, retain: false }) =>
    new Promise(resolve => {
      const log = require('debug')('mano:out');
      client.publish(topic, stringify(message), config, () => {
        log(`==> ${topic} message`);
        resolve();
      });
    });

  const subscribe = (topic, config = { qos: 0 }) => new Promise(resolve => {
    const log = require('debug')('mano:in');
    client.subscribe(topic, config, () => {
      const sub$ = fromEvents(client, 'message', (tpc, msg) => ({
        topic: tpc,
        payload: parse(msg)
      }))
        .filter(x => x.topic === topic)
        .map(x => {
          log(`<== ${topic} message`);
          return x;
        });
      resolve(sub$);
    });
  });

  const end = () => new Promise(resolve => {
    client.end(true, () => {
      resolve();
    });
  });

  const { clientId } = options;

  return { publish, subscribe, clientId, end };
};
