const config = require('./../config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, () => console.log('Connected'));

module.exports = { mongoose };
