const { test } = require('ava');
const mock = require('mock-require');

// mock('mqtt', {
//   connect: (url, config) => ({
//     on: (event, handler) => {
//       if (event === 'connect') handler();
//       if (event === 'message') handler('/testtopic', 'hello');
//     },
//     subscribe: (topic, handler) => {
//       handler();
//     },
//     publish: (topic, msg, config, handler) => {
//       handler(topic, msg, (t, m) => {});
//     }
//   })
// });

// const mano = require('.');

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
