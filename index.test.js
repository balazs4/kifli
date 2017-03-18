const { test } = require('ava');
const mock = require('mock-require');

mock('mqtt', {
  connect: (url, config) => ({
    on: (event, handler) => {
      if (event === 'connect') handler();
      if (event === 'message') handler('/test', 'foobar');
    },
    off: (event, handler) => {},
    subscribe: (topic, config, handler) => {
      handler();
    },
    publish: (topic, payload, config, handler) => {
      handler();
    }
  })
});

const mano = require('.');

test('API', async t => {
  const api = await mano('mqtt://fake.url', { clientId: 'test' });
  t.is(typeof api.publish, typeof Function);
  t.is(typeof api.subscribe, typeof Function);
  t.is(typeof api.end, typeof Function);
  t.is(api.clientId, 'test');
});

test('Happy path #subscribe', async t => {
  const client = await mano('mqtt://fake.url', { clientId: 'test' });
  const sub$ = await client.subscribe('/test');
  sub$.onValue(x => {
    t.deepEqual(x, { topic: '/test', payload: 'foobar' });
  });
});

// test.cb('MQTT', t => {
//   mano(
//     'mqtt://fake/url',
//     '/testtopic',
//     {},
//     (tpc, msg, pub) => {
//       t.is(tpc, '/testtopic');
//       t.is(msg, 'hello');
//       t.end();
//     },
//     () => {}
//   );
// });
