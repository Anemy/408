const Actions = {
  test: function(input) {
    console.log(input);
    return {
      type: 'TEST',
      input,
    };
  },
};

module.exports = Actions;
