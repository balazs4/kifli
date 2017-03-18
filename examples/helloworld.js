module.exports = ({ publish }) => async ({ topic, message }) => {
  await publish(
    '/bar',
    Object.assign({}, { from: { topic, message } }, { stamp: new Date() })
  );
};
