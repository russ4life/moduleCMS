const { buildModel } = require('./buildModel');

const buildModels = ({ loadModels = [] }) => {
  const models = {};
  const schemas = {};
  const defaults = {};
  loadModels.forEach((loadModel) => {
    const { modelsName } = loadModel;
    const { Model, Schema, schemaDefaults } = buildModel({ ...loadModel });
    models[modelsName] = Model;
    schemas[`${modelsName}Schema`] = Schema;
    defaults[`${modelsName}SchemaDefaults`] = schemaDefaults;
  });
  return {
    models,
    schemas,
    defaults,
  };
};

module.exports = {
  buildModels,
};
