/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const validator = require('validator');

const { userExtend } = require('./userExtend');

const userSchema = {
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (validator.contains(value.toLowerCase(), 'password')) {
        throw new Error('Password is invalid');
      }
    },
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Language',
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
    issue: {
      type: Date,
      required: true,
    },
  }],
  avatar: {
    type: Buffer,
  },
};

module.exports = {
  userSchema,
  userExtend,
};
