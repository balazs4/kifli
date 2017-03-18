module.exports = {
  parse: input => {
    const nobuffer = typeof input === 'object' ? input.toString() : input;
    try {
      return JSON.parse(nobuffer);
    } catch (error) {
      return nobuffer;
    }
  },
  stringify: msg => typeof msg === typeof {} ? JSON.stringify(msg) : msg
};
