const log = require('debug')('mano');
const error = require('debug')('mano:err');
const { connect } = require('mqtt');

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
    const publish = (topic, msg) => {
      client.publish(topic, JSON.stringify(msg));
    };
    const subscribe = (topic, callback) => {
      client.on('message', (tpc, msg) => {
        if (tpc === topic) callback(JSON.parse(msg.toString()));
      });
      client.subscribe(topic);
    };
    const end = () => {
      client.end();
      onClose();
    };
    onConnect({ publish, subscribe, end });
    log('ready');
  });
};
