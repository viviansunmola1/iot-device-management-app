const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  uniqueIdentifier: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    default: function () {
      
      return Date.now().toString();
    },
  },
  name: { type: String, required: true },
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
  fee: { type: Number, required: true },
  warehouse: { type: String, required: true },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
