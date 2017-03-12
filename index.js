const log = require('debug')('mano');
const error = require('debug')('mano:err');
const { connect } = require('mqtt');

const parse = input => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return input;
  }
};

const stringify = msg => typeof msg === typeof {} ? JSON.stringify(msg) : msg;

module.exports = (broker, topic, config = {}, handler, onClose) => {
  const client = connect(broker, config);
  client.on('offline', () => {
    log(`disconnected from ${broker}`);
    client.removeAllListeners('message');
  });
  client.on('error', err => {
    error(err);
  });
  client.on('close', () => {
    log(`${broker} is offline?`);
    client.removeAllListeners('message');
  });
  client.on('connect', async () => {
    log(`connected to ${broker}...`);
    const publish = (tcp, msg) => new Promise((resolve, reject) => {
      if (tcp === topic) {
        reject(`You cannot publish to the same topic again [${topic}]`);
        return;
      }
      client.publish(tcp, stringify(msg), {}, () => {
        log(`[${tcp}] outcoming message`);
        resolve();
      });
    });
    client.subscribe(topic, () => {
      client.on('message', (tpc, msg) => {
        if (tpc === topic) {
          log(`[${topic}] incoming message`);
          handler(topic, parse(msg.toString()), publish);
        }
      });
      log(`registered to [${topic}]`);
    });
  });
};
