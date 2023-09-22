const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  // Define  schema fields ( name, unique identifier)
});

module.exports = mongoose.model('Industry', industrySchema);
