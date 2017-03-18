module.exports = ({ publish }) => async ({ topic, payload }) => {
  await publish(
    '/bar',
    Object.assign({}, { from: { topic, payload } }, { stamp: new Date() })
  );
};
