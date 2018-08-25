var mongoose = require('mongoose');
var Game = require('../games/gameModel');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  multiPrice: {
    type: Number,
    required: true
  },
  singlePrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('category', CategorySchema);
