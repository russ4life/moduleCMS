const { buildSchemaExtendUpdate } = require('./buildSchemaExtendUpdate');

const buildSchemaExtendStatics = ({ Schema = {}, extend = {} }) => {
  const key = 'statics';
  return buildSchemaExtendUpdate({ key, Schema, extend });
};

module.exports = {
  buildSchemaExtendStatics,
};
