const mongoose = require('mongoose');

const { buildSchemaDefaultArchive } = require('./buildSchemaDefaultArchive');

const { schemaOptions } = require('./schemaOptions');
const { schemaDefaults: coreDefaultsRaw } = require('./schemaDefaults');

const coreDefaults = { ...coreDefaultsRaw };
delete coreDefaults.live;

const buildSchemaArchive = ({
  modelsName = '',
  Schema = {},
  schemaDefaults = {},
  extend = {},
}) => {
  const archiveOptions = (Object.prototype.hasOwnProperty.call(extend, 'archiveOptions')) ? extend.archiveOptions : {};
  const archiveName = `Archive${modelsName}`;
  const key = `${modelsName.charAt(0).toLowerCase()}${modelsName.slice(1)}Id`;
  const archiveSchemaStart = {};
  archiveSchemaStart[key] = {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: modelsName,
  };
  const {
    archiveSchemaDefaults,
    separate,
    separateArchives,
  } = (
    buildSchemaDefaultArchive({ archiveSchemaStart, schemaDefaults, archiveOptions })
  );
  const ArchiveSchema = new mongoose.Schema(archiveSchemaDefaults, schemaOptions);
  const ArchiveModel = mongoose.model(archiveName, ArchiveSchema);

  const archiveDataKeys = Object.keys(archiveSchemaDefaults);
  const coreDefaultsKeys = Object.keys(coreDefaults);

  const isCoreUpdateKey = ({ updayeKey }) => (coreDefaultsKeys.includes(updayeKey) || separate);

  const addArchiveCopy = async (archiveData, next) => {
    const archiveSave = {};
    const count = archiveDataKeys.reduce((update, archiveDataKey) => {
      const isCoreUpdate = isCoreUpdateKey(archiveDataKey);
      const add = (archiveData.isModified(archiveDataKey) && !isCoreUpdate) ? 1 : 0;
      const item = archiveData[archiveDataKey];
      archiveSave[archiveDataKey] = item;
      return update + add;
    }, 0);

    if (count > 0) {
      archiveSave[key] = archiveData._id;
      const archive = new ArchiveModel(archiveSave);
      await archive.save();
    }
    next();
  };

  const callbackFunctions = {
    async buildSchemaArchive(next) {
      await addArchiveCopy(this, next);
    },
  };

  Schema.pre('save', callbackFunctions.buildSchemaArchive);

  if (separate) {
    const separateArchivesKeys = Object.keys(separateArchives);

    separateArchivesKeys.forEach((separateKey) => {
      const separateKeyName = `${separateKey.charAt(0).toUpperCase()}${separateKey.slice(1)}`;
      const separateName = `ArchiveSeparate${modelsName}${separateKeyName}`;
      const ArchiveSeparateSchema = new mongoose.Schema(
        separateArchives[separateKey],
        schemaOptions,
      );
      const ArchiveSeparateModel = mongoose.model(separateName, ArchiveSeparateSchema);

      const addArchiveSeparatCopy = async (archiveData, next) => {
        const archiveSave = {};
        const add = (archiveData.isModified(separateKey)) ? 1 : 0;
        if (add === 1) {
          archiveSave[key] = archiveData._id;
          archiveSave[separateKey] = archiveData[separateKey];
          const archive = new ArchiveSeparateModel(archiveSave);
          await archive.save();
        }
        next();
      };

      const callbackSeparatFunctions = {
        async buildSchemaArchiveSeparat(next) {
          await addArchiveSeparatCopy(this, next);
        },
      };

      Schema.pre('save', callbackSeparatFunctions.buildSchemaArchiveSeparat);
    });
  }

  return {
    archiveSchemaDefaults,
    ArchiveSchema,
    ArchiveModel,
    archiveName,
  };
};

module.exports = {
  buildSchemaArchive,
};
