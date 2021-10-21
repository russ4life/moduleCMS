const { cleanSchemaDefaultsArchive } = require('./cleanSchemaDefaultsArchive');
const { schemaDefaults: coreDefaultsRaw } = require('./schemaDefaults');

const coreDefaults = { ...coreDefaultsRaw };
delete coreDefaults.live;
delete coreDefaults.actions;

const buildSchemaDefaultArchive = ({
  archiveSchemaStart = {},
  schemaDefaults = {},
  archiveOptions = {},
}) => {
  const cleanSchemaObjects = cleanSchemaDefaultsArchive({ schemaDefaults });
  const archiveSchemaDefaults = {
    ...archiveSchemaStart,
    ...cleanSchemaObjects,
  };
  const separateArchives = {};
  const separate = (Object.prototype.hasOwnProperty.call(archiveOptions, 'separate'));

  if (separate) {
    const coreDefaultsKeys = Object.keys(coreDefaults);
    const coreDefaultObject = {};
    coreDefaultsKeys.forEach((key) => {
      coreDefaultObject[key] = { ...archiveSchemaDefaults[key] };
    });
    const separateKey = Object.keys(archiveOptions.separate);

    separateKey.forEach((key) => {
      const separateData = {};
      separateData[key] = (Array.isArray(archiveSchemaDefaults[key])) ? (
        [...archiveSchemaDefaults[key]]
      ) : { ...archiveSchemaDefaults[key] };
      separateArchives[key] = {
        ...archiveSchemaStart,
        ...separateData,
        ...coreDefaultObject,
      };
      delete archiveSchemaDefaults[key];
    });
  }

  return {
    archiveSchemaDefaults,
    separate,
    separateArchives,
  };
};

module.exports = {
  buildSchemaDefaultArchive,
};
