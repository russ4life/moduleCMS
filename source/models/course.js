const mongoose = require('mongoose');

const course = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Language',
  },
  layout: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Layout',
  },
  copyright: {
    type: String,
    required: false,
    trim: true,
  },
  flexible: {
    type: Boolean,
    required: false,
    default: false,
  },
  bookmarking: {
    type: Boolean,
    required: false,
    default: false,
  },
  completionCustom: {
    type: Boolean,
    required: false,
    default: false,
  },
  completionPage: {
    type: Number,
    required: false,
    default: -1,
  },
  courseComponents: [{
    courseComponentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseComponentType',
    },
    courseComponentTypeOptions: {
      type: mongoose.Schema.Types.Mixed,
    },
  }],
};

module.exports = { course };
