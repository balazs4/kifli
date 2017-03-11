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

module.exports = (broker, onConnect, onClose) => {
  const client = connect(broker);
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
  client.on('connect', () => {
    log(`connected to ${broker}...`);
    const publish = (topic, msg) => new Promise((resolve, reject) => {
      log('publishing');
      client.publish(topic, stringify(msg), {}, () => {
        resolve();
      });
    });
    const subscribe = (topic, callback) => new Promise((resolve, reject) => {
      client.on('message', (tpc, msg) => {
        if (tpc === topic) callback(parse(msg.toString()));
      });
      client.subscribe(topic, () => {
        resolve(
          () => new Promise((res, rej) => {
            client.unsubscribe(topic, () => {
              res();
            });
          })
        );
      });
    });
    const end = () => {
      client.removeAllListeners();
      client.end(() => {
        onClose();
      });
    };
    onConnect({ publish, subscribe, end });
    log('ready');
  });
};
