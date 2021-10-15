const buildSchemaExtendVirtual = ({ Schema = {}, extend = {} }) => {
  const key = 'virtual';
  const virtual = {};
  virtual[key] = {};
  if (Object.prototype.hasOwnProperty.call(extend, key)) {
    const from = extend[key];
    const keys = Object.keys(from);
    const virtualSchema = {};
    keys.forEach((virtualKey) => {
      virtualSchema[virtualKey] = Schema[key](virtualKey, from[virtualKey]);
    });
    virtual[key] = {
      from,
      keys,
      virtualSchema: { ...virtualSchema },
    };
  }
  return {
    ...virtual,
  };
};
module.exports = {
  buildSchemaExtendVirtual,
};
