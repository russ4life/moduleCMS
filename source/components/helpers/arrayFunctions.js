const ArrayFunctions = {
  filterArray: ({
    input = [],
    exclude = [],
  }) => input.filter((item) => !exclude.includes(item)),
};

module.exports = {
  ArrayFunctions,
};
