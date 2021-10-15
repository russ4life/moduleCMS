const mongoose = require('mongoose');

const { schemaOptions } = require('./schemaOptions');

const { buildSchemaDefaults } = require('./buildSchemaDefaults');

const buildSchema = ({
  modelsDefault = {},
  modelsExtend = () => {},
}) => {
  const {
    schema,
  } = buildSchemaDefaults({
    modelsDefault,
    modelsExtend,
  });
  const Schema = new mongoose.Schema(schema, schemaOptions);
  return {
    Schema,
    schemaDefaults: schema,
  };
};

module.exports = {
  buildSchema,
};
