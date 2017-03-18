module.exports = ({ publish }) => async value => {
  await publish('/bar', Object.assign({}, value, { stamp: new Date() }));
};
