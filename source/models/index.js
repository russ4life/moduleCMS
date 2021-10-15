const { buildModels } = require('./helpers/buildModels');

const { language } = require('./language');
const { layout } = require('./layout');
const { course } = require('./course');
const { courseComponentInputType } = require('./courseComponentInputType');
const { courseComponentType } = require('./courseComponentType');
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
    modelsName: 'CourseComponentInputType',
    modelsDefault: courseComponentInputType,
  },
  {
    modelsName: 'CourseComponentType',
    modelsDefault: courseComponentType,
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
