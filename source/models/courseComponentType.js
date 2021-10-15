const mongoose = require('mongoose');
const validator = require('validator');

const courseComponentType = {
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: 500,
  },
  courseComponentTypeKey: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 10,
    validate(value) {
      if (!validator.isAlpha(value, '')) {
        throw new Error('Course Component Key is invalid');
      }
    },
  },
  completionActions: {
    type: Boolean,
    required: true,
  },
  completionActionsOptions: {
    type: mongoose.Schema.Types.Mixed,
  },
  scoringActions: {
    type: Boolean,
    required: true,
  },
  requiredActions: {
    type: Boolean,
    required: true,
  },
  courseComponentGroups: [{
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    courseComponentInputs: [{
      label: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      description: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      translatable: {
        type: Boolean,
        default: false,
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
      isGlobal: {
        type: Boolean,
        default: false,
      },
      defaultValue: {
        string: {
          type: String,
        },
        boolean: {
          type: Boolean,
        },
        number: {
          type: Number,
        },
        buffer: {
          type: Buffer,
        },
      },
      courseComponentInputType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseComponentInputType',
      },
      courseComponentInputTypeOptions: {
        type: mongoose.Schema.Types.Mixed,
      },
    }],
  }],
};

module.exports = { courseComponentType };
