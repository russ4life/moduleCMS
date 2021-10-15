const buildSchemaExtendUpdate = ({ key = '', Schema = {}, extend = {} }) => {
  const update = {};
  update[key] = {};
  if (Object.prototype.hasOwnProperty.call(extend, key)) {
    const SchemaUpdate = Schema;
    const from = extend[key];
    const fromKeys = Object.keys(from);
    const SchemaObjects = {};
    fromKeys.forEach((fromKey) => {
      const SchemaObject = from[fromKey];
      SchemaUpdate[key][fromKey] = SchemaObject;
      SchemaObjects[fromKey] = SchemaObject;
    });
    update[key] = {
      from,
      fromKeys,
      SchemaObjects,
    };
  }
  return {
    ...update,
  };
};

module.exports = {
  buildSchemaExtendUpdate,
};
