const { cleanSchemaDefaultsArchive } = require('./cleanSchemaDefaultsArchive');

const buildSchemaDefaultArchive = ({ archiveSchemaStart = {}, schemaDefaults = {} }) => {
  const cleanSchemaObjects = cleanSchemaDefaultsArchive({ schemaDefaults });
  const archiveSchemaDefaults = {
    ...archiveSchemaStart,
    ...cleanSchemaObjects,
  };
  return archiveSchemaDefaults;
};

module.exports = {
  buildSchemaDefaultArchive,
};
