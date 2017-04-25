var mongoose = require('mongoose');

var sketchSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  url: {
    type: String
  },

  dataURL: {
    type: String,
    required: true
  },

  timestamp: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sketch', sketchSchema);
