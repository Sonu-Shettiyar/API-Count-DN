const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  todo: String,
  description: String
});

module.exports = mongoose.model('Data', DataSchema);
