const mongoose = require('mongoose');
const { buildSchema } = require('./buildSchema');
const { buildSchemaExtends } = require('./buildSchemaExtends');
const { buildSchemaArchive } = require('./buildSchemaArchive');

const buildModel = ({ modelsName = '', modelsDefault = {}, modelsExtend = () => {} }) => {
  const { Schema, schemaDefaults } = buildSchema({ modelsDefault, modelsExtend });
  const extend = buildSchemaExtends({ modelsExtend, Schema });
  const archive = buildSchemaArchive({ modelsName, Schema, schemaDefaults });
  const Model = mongoose.model(modelsName, Schema);
  return {
    Model,
    Schema,
    extend,
    archive,
  };
};

module.exports = {
  buildModel,
};
