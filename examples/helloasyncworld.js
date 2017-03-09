const log = require('debug')(require('path').parse(__filename).name);

const sleep = ms => new Promise((resolve, reject) => {
  setTimeout(
    () => {
      resolve();
    },
    ms
  );
});

module.exports = ({ publish, subscribe, end }) => {
  subscribe('/foo', async ({ foo = 5 }) => {
    log('incoming message');
    await sleep(5000);
    const outgoing = { foo: 'bar' };
    publish('/bar', outgoing);
    log('outgoing message...');
  });
  log('initalized');
};
