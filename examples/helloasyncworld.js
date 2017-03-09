const log = require('debug')(require('path').parse(__filename).name);

module.exports = ({ publish, subscribe, end }) => {
  subscribe('/foo', async ({foo}) => {
    log('incoming message');
    const outgoing = await new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve({ hello: foo * 2 });
        },
        foo * 100
      );
    });
    publish('/bar', outgoing);
    log('outgoing message...');
  });
  log('initalized');
};
