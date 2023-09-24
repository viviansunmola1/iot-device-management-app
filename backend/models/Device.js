const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: true,
  },
  fee: Number,
  warehouse: String,
  additionalTime: String,
});


const Device = mongoose.model('Device', deviceSchema);


module.exports = Device;
