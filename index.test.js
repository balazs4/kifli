const { test } = require('ava');
const mock = require('mock-require');

mock('mqtt', {
  connect: (url, config) => {
    const on = (event, handler) => {
      if (event === 'connect') handler();
      if (event === 'message') handler('/test', 'foobar');
    };
    const off = (event, handler) => {};
    const subscribe = (topic, config, handler) => {
      handler();
    };
    const publish = (topic, payload, config, handler) => {
      handler();
    };
    return { on, off, subscribe, publish };
  }
});
const sut = require('.');

test('API', async t => {
  const api = await sut('mqtt://fake.url', { clientId: 'test' });
  t.is(typeof api.publish, typeof Function);
  t.is(typeof api.subscribe, typeof Function);
  t.is(typeof api.end, typeof Function);
  t.is(api.clientId, 'test');
});

test('Happy path #subscribe', async t => {
  const client = await sut('mqtt://fake.url', { clientId: 'test' });
  const sub$ = await client.subscribe('/test');
  const x = await new Promise(resolve => {
    sub$.onValue(resolve);
  });
  t.deepEqual(x, { topic: '/test', payload: 'foobar' });
});

test('Happy path #publish', async t => {
  const client = await sut('mqtt://fake.url', { clientId: 'test' });
  t.notThrows(client.publish('/test', 'foobar'));
});
