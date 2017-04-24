var mongoose = require('mongoose');

var sketchSchema = new mongoose.Schema({
  tile: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  dataURL: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('sketches', sketchSchema);
