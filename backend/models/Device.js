const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  uniqueIdentifier: { type: String, required: true, unique: true },
  fee: { type: Number, required: true, min: 0 },
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
});

module.exports = mongoose.model('Device', deviceSchema);
