module.exports = {
  parse: input => {
    try {
      return typeof input === typeof Buffer
        ? JSON.parse(input.toString())
        : JSON.parse(input);
    } catch (error) {
      return input;
    }
  },
  stringify: msg => typeof msg === typeof {} ? JSON.stringify(msg) : msg
};
