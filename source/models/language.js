const language = {
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  localName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
};

module.exports = { language };
