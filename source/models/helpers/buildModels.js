const { buildModel } = require('./buildModel');

const buildModels = ({ loadModels = [] }) => {
  const models = {};
  const schemas = {};
  loadModels.forEach((loadModel) => {
    const { modelsName } = loadModel;
    const { Model, schema } = buildModel({ ...loadModel });
    models[modelsName] = Model;
    schemas[modelsName] = schema;
  });
  return {
    models,
    schemas,
  };
};

module.exports = {
  buildModels,
};
