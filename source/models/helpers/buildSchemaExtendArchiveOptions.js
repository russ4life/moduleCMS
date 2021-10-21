const buildSchemaExtendArchiveOptions = ({ extend = {} }) => {
  const key = 'archiveOptions';
  const archiveOptions = {};
  archiveOptions[key] = {};
  if (Object.prototype.hasOwnProperty.call(extend, key)) {
    const from = extend[key];
    const keys = Object.keys(from);
    const archiveSettings = {};
    keys.forEach((archiveOptionsKey) => {
      archiveSettings[archiveOptionsKey] = from[archiveOptionsKey];
    });
    archiveOptions[key] = {
      ...archiveSettings,
    };
  }
  return {
    ...archiveOptions,
  };
};
module.exports = {
  buildSchemaExtendArchiveOptions,
};
