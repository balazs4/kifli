const { connect } = require('mqtt');

module.exports = (broker, options = {}, handler) => {
  const client = connect(broker, options);
  client.on('error', err => {
    throw err;
  });
  client.on('connect', () => {
    const publish = (topic, msg) => {
      client.publish(topic, JSON.stringify(msg));
    };
    const subscribe = (topic, callback) => {
      client.on('message', (tpc, msg) => {
        if (tpc === topic) callback(JSON.parse(msg.toString()));
      });
      client.subscribe(topic);
    };
    const end = client.end.bind(client);
    handler({ publish, subscribe, end });
  });
};
