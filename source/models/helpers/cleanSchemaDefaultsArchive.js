const cleanSchemaDefaultsArchive = ({ schemaDefaults = {} }) => {
  const schemaObjectsArchive = {
    ...schemaDefaults,
  };

  const cleanSchemaDefaultsArchiveObjects = ({ schemaObjects = {} }) => {
    const keys = Object.keys(schemaObjects);
    const cleanSchemaObjects = {};

    const cleanSchemaDefaultsArchiveArray = ({ schemaObject = [] }) => {
      const cleanSchemaArray = { ...schemaObject[0] };
      const schemaObjectClean = cleanSchemaDefaultsArchiveObjects({
        schemaObjects: cleanSchemaArray,
      });
      return [schemaObjectClean];
    };

    const cleanSchemaDefaultsArchiveObject = ({ schemaObject = {} }) => {
      const schemaObjectClean = { ...schemaObject };
      delete schemaObjectClean.unique;
      return schemaObjectClean;
    };

    keys.forEach((key) => {
      const schemaObject = schemaObjects[key];
      const schemaObjectClean = (Array.isArray(schemaObject)) ? (
        cleanSchemaDefaultsArchiveArray({ schemaObject })
      ) : (
        cleanSchemaDefaultsArchiveObject({ schemaObject })
      );
      cleanSchemaObjects[key] = schemaObjectClean;
    });
    return cleanSchemaObjects;
  };

  const cleanSchemaObjects = (
    cleanSchemaDefaultsArchiveObjects({ schemaObjects: schemaObjectsArchive })
  );

  return cleanSchemaObjects;
};

module.exports = {
  cleanSchemaDefaultsArchive,
};
