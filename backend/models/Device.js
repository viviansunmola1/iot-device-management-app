const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  // Define  schema fields  (e.g., name, unique identifier)
});

module.exports = mongoose.model('Device', deviceSchema);