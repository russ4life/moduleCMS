const { schemaDefaults } = require('./schemaDefaults');
const { buildSchemaExtend } = require('./buildSchemaExtend');

const buildModelSchemaExtendDefaults = ({ extend = {} }) => {
  const isExtendObject = (Object.prototype.hasOwnProperty.call(extend, 'schemaDefaults'));
  return (isExtendObject) ? extend.schemaDefaults : {};
};

const buildSchemaDefaults = ({
  modelsDefault = {},
  modelsExtend = () => {},
}) => {
  const extend = buildSchemaExtend({ modelsExtend });
  const modelSchemaExtendDefaults = buildModelSchemaExtendDefaults({ extend });
  const schema = {
    ...modelsDefault,
    ...schemaDefaults,
    ...modelSchemaExtendDefaults,
  };
  return {
    schema,
  };
};

module.exports = {
  buildSchemaDefaults,
};
