const buildSchemaExtendPre = ({ Schema = {}, extend = {} }) => {
  const key = 'pre';
  const pre = {};
  pre[key] = {};
  if (Object.prototype.hasOwnProperty.call(extend, key)) {
    const SchemaUpdate = Schema;
    const from = extend[key];
    const fromKeys = Object.keys(from);
    const SchemaPres = {};
    fromKeys.forEach((fromKey) => {
      const functions = from[fromKey];
      const SchemaPre = {};
      functions.forEach((callback) => {
        const callbackFunctions = {
          async buildSchemaExtendFunction(next) {
            await callback(this, next);
          },
        };
        const preFunction = callbackFunctions.buildSchemaExtendFunction;
        SchemaUpdate[key](fromKey, preFunction);
        SchemaPre[callback] = preFunction;
      });
      SchemaPres[fromKey] = SchemaPre;
    });
    pre[key] = {
      from,
      fromKeys,
      SchemaPres,
    };
  }
  return {
    ...pre,
  };
};

module.exports = {
  buildSchemaExtendPre,
};
