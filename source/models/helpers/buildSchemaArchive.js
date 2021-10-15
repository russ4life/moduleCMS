const mongoose = require('mongoose');

const { buildSchemaDefaultArchive } = require('./buildSchemaDefaultArchive');

const { schemaOptions } = require('./schemaOptions');

const buildSchemaArchive = ({
  modelsName = '',
  Schema = {},
  schemaDefaults = {},
}) => {
  const archiveName = `Archive${modelsName}`;
  const key = `${modelsName.charAt(0).toLowerCase()}${modelsName.slice(1)}Id`;
  const archiveSchemaStart = {};
  archiveSchemaStart[key] = {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: modelsName,
  };
  const archiveSchemaDefaults = (
    buildSchemaDefaultArchive({ archiveSchemaStart, schemaDefaults })
  );
  const ArchiveSchema = new mongoose.Schema(archiveSchemaDefaults, schemaOptions);
  const ArchiveModel = mongoose.model(archiveName, ArchiveSchema);

  const addArchiveCopy = async (archiveData, next) => {
    const archiveDataKeys = Object.keys(archiveSchemaDefaults);
    const archiveSave = {};
    const count = archiveDataKeys.reduce((update, archiveDataKey) => {
      const add = (archiveData.isModified(archiveDataKey)) ? 1 : 0;
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
