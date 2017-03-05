const { test } = require('ava');

const mano = require('.');

test.cb('MQTT', t => {
  mano('mqtt://localhost:1883', { clientId: 'avatest' }, (
    { publish, subscribe, end }
  ) => {
    subscribe('/foobar', msg => {
      t.deepEqual(msg, { hello: 'world' });
      end();
      t.end();
    });
    publish('/foobar', { hello: 'world' });
  });
});
