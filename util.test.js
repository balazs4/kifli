const { test } = require('ava');
const sut = require('./util');

[
  { fn: 'stringify', input: 'foo', expect: 'foo' },
  { fn: 'stringify', input: 42, expect: 42 },
  {
    fn: 'stringify',
    input: { foo: 'bar' },
    expect: JSON.stringify({ foo: 'bar' })
  },
  { fn: 'parse', input: 'nojson', expect: 'nojson' },
  { fn: 'parse', input: 42, expect: 42 },
  {
    fn: 'parse',
    input: JSON.stringify({ foo: 'bar' }),
    expect: { foo: 'bar' }
  },
  {
    fn: 'parse',
    input: new Buffer(JSON.stringify({ foo: 'buffer' })),
    expect: { foo: 'buffer' }
  },
  {
    fn: 'parse',
    input: new Buffer('nojsonbutstring'),
    expect: 'nojsonbutstring'
  }
].forEach(spec => {
  test(`${spec.fn}(${spec.input})`, t => {
    t.deepEqual(sut[spec.fn](spec.input), spec.expect);
  });
});
