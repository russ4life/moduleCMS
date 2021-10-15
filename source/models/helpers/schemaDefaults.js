const mongoose = require('mongoose');

const schemaDefaults = {
  live: {
    type: Boolean,
    required: false,
    default: true,
  },
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  updatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
};

module.exports = {
  schemaDefaults,
};
