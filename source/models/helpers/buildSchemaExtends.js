const { buildSchemaExtend } = require('./buildSchemaExtend');
const { buildSchemaExtendVirtual } = require('./buildSchemaExtendVirtual');
const { buildSchemaExtendMethods } = require('./buildSchemaExtendMethods');
const { buildSchemaExtendStatics } = require('./buildSchemaExtendStatics');
const { buildSchemaExtendPre } = require('./buildSchemaExtendPre');

const buildSchemaExtends = ({ modelsExtend = () => {}, Schema = {} }) => {
  const extend = buildSchemaExtend({ modelsExtend });
  const { virtual } = buildSchemaExtendVirtual({ Schema, extend });
  const { methods } = buildSchemaExtendMethods({ Schema, extend });
  const { statics } = buildSchemaExtendStatics({ Schema, extend });
  const { pre } = buildSchemaExtendPre({ Schema, extend });
  const extendObject = {
    extend,
    virtual,
    methods,
    statics,
    pre,
  };
  return {
    ...extendObject,
  };
};

module.exports = {
  buildSchemaExtends,
};
