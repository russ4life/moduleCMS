const { buildModels } = require('./helpers/buildModels');

const { language } = require('./language');
const { layout } = require('./layout');
const { course } = require('./course');
const { elementInputType } = require('./elementInputType');
const { elementType } = require('./elementType');
const { userSchema, userExtend } = require('./user');

const loadModels = [
  {
    modelsName: 'Language',
    modelsDefault: language,
  },
  {
    modelsName: 'Layout',
    modelsDefault: layout,
  },
  {
    modelsName: 'Course',
    modelsDefault: course,
  },
  {
    modelsName: 'ElementInputType',
    modelsDefault: elementInputType,
  },
  {
    modelsName: 'ElementType',
    modelsDefault: elementType,
  },
  {
    modelsName: 'User',
    modelsDefault: userSchema,
    modelsExtend: userExtend,
  },
];

const { models, schemas } = buildModels({ loadModels });

module.exports = {
  ...models,
  schemas,
};
