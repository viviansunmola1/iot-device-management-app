const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model('Industry', industrySchema);
