const mongoose = require('mongoose');

const options = {};

mongoose.connect(process.env.MONGODB_URL, options);
