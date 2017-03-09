const log = require('debug')(require('path').parse(__filename).name);

module.exports = ({ publish, subscribe, end }) => {
  subscribe('/foo', msg => {
    log('incoming message');
    publish('/bar', { hello: 'world' });
    log('outgoing message...');
  });
  log('initalized');
};
