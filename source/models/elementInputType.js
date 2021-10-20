const mongoose = require('mongoose');
const validator = require('validator');

const elementInputType = {
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: 500,
  },
  elementInputTypeKey: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 10,
    validate(value) {
      if (!validator.isAlpha(value, '')) {
        throw new Error('Course Component Input Type Key is invalid');
      }
    },
  },
  componentInputType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ComponentInputType',
  },
};

module.exports = { elementInputType };
