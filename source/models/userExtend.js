const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userExtend = () => {
  const virtual = {
    createdCourse: {
      ref: 'Course',
      localField: '_id',
      foreignField: 'createdUser',
    },
    updatedCourse: {
      ref: 'Course',
      localField: '_id',
      foreignField: 'updatedUser',
    },
    createdLanguages: {
      ref: 'Language',
      localField: '_id',
      foreignField: 'createdUser',
    },
    updatedLanguages: {
      ref: 'Language',
      localField: '_id',
      foreignField: 'updatedUser',
    },
    createdLayouts: {
      ref: 'Layout',
      localField: '_id',
      foreignField: 'createdUser',
    },
    updatedLayouts: {
      ref: 'Layout',
      localField: '_id',
      foreignField: 'updatedUser',
    },
  };

  const methods = {
    toJSON() {
      const user = this;
      const userObject = user.toObject();

      delete userObject.password;
      delete userObject.tokens;
      delete userObject.avatar;
      delete userObject.archive;

      return userObject;
    },
    async generateAuthToken() {
      const user = this;
      const issue = new Date();
      const token = jwt.sign({
        _id: user._id.toString(),
      }, process.env.JWT_SECRET);
      user.tokens = user.tokens.concat({
        token,
        issue,
      });
      await user.save();
      return token;
    },
  };

  const statics = {
    findByCredentials: async (User, email, password) => {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        throw new Error('Unable to login');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Unable to login');
      }
      return user;
    },
    checkUniqueValue: async (User, key, value) => {
      const check = {};
      check[key] = value;
      const find = await User.findOne({
        ...check,
      });
      const unique = (!find);
      return unique;
    },
  };

  const callbacks = {
    async passwordHash(update, next) {
      if (update.isModified('password')) {
        const save = update;
        save.password = await bcrypt.hash(update.password, 8);
      }
      next();
    },
  };

  const pre = {
    save: [
      callbacks.passwordHash,
    ],
  };

  const schemaDefaults = {
    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  };

  return {
    virtual,
    methods,
    statics,
    pre,
    schemaDefaults,
  };
};

module.exports = {
  userExtend,
};
