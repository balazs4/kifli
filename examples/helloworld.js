module.exports = async ({ publish, subscribe, end }) => {
  const unsub = await subscribe('/foo', async msg => {
    await publish('/bar', { hello: 'world' });
  });

  setTimeout(
    async () => {
      console.log('Boooring');
      await unsub();
      end();
    },
    3000
  );
};
