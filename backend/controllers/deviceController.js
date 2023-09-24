const Device = require('../models/Device');
const mongoose = require('mongoose')

// Controller function to get all devices
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('industry', 'name');
    res.status(200).json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new device
exports.createDevice = async (req, res) => {
  try {
    const { name, description, industry, fee } = req.body;

    // Validate the ObjectId for the "industry" field
    if (!mongoose.Types.ObjectId.isValid(industry)) {
      return res.status(400).json({ error: 'Invalid industry ObjectId' });
    }

    const newDevice = new Device({ name, description, industry, fee });
    const device = await newDevice.save();
    res.status(201).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a device
exports.updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a device
exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDevice = await Device.findByIdAndDelete(id);
    if (!deletedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDevices,
  createDevice,
  updateDevice,
  deleteDevice,
};
