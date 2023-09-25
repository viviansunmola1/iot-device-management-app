// Import the necessary model (e.g., Device model)
const Device = require('../models/Device');
const mongoose = require('mongoose');

// Define the function to create a new device
const createDevice = async (req, res) => {
  try {
    // Extract the data for the new device from the request body
    const { name, description, industry, fee, warehouse } = req.body;

    // Validate the ObjectId for the "industry" field
    if (!mongoose.Types.ObjectId.isValid(industry)) {
      return res.status(400).json({ error: 'Invalid industry ObjectId' });
    }

    // Generate a unique identifier
    const uniqueIdentifier = Date.now().toString(); // You can replace this with your own logic

    // Create a new device instance
    const newDevice = new Device({
      uniqueIdentifier, // Set the unique identifier
      name,
      description,
      industry,
      fee,
      warehouse,
    });

    // Save the new device to the database
    await newDevice.save();

    // Respond with the created device as a JSON response
    res.status(201).json(newDevice);
  } catch (error) {
    // Handle errors and send an error response if necessary
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the device' });
  }
};


// Define the function to get all devices
const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('industry', 'name');
    
    // Return the list of devices as a JSON response
    res.json(devices);
  } catch (error) {
    // Handle errors and send an error response if necessary
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching devices' });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Find the device by ID and update its properties
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the device' });
  }
};

// Define the function to delete a device
const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the device by ID and remove it
    const deletedDevice = await Device.findByIdAndRemove(id);

    if (!deletedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the device' });
  }
};

// Export the createDevice and getAllDevices functions so they can be used in routes
module.exports = {
  createDevice,
  getAllDevices,
  updateDevice,
  deleteDevice,
};
