module.exports = async (topic, msg, publish) => {
  await publish('/bar', Object.assign({}, msg, { from: topic }));
};
