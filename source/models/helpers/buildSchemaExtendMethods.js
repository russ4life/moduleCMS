const { buildSchemaExtendUpdate } = require('./buildSchemaExtendUpdate');

const buildSchemaExtendMethods = ({ Schema = {}, extend = {} }) => {
  const key = 'methods';
  return buildSchemaExtendUpdate({ key, Schema, extend });
};

module.exports = {
  buildSchemaExtendMethods,
};
