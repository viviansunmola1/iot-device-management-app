// deviceController.js

// Import the necessary model (e.g., Device model)
const Device = require('../models/Device');

// Define the function to create a new device
const createDevice = async (req, res) => {
  try {
    // Extract all the necessary data for the new device from the request body
    const { name, description, fee, industry } = req.body;

    // Create a new device instance with the remaining fields
    const newDevice = new Device({
      name,
      description,
      fee,
      industry,
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
    // Fetch all devices from the database using Mongoose
    console.log('get all devices work')
    const devices = await Device.find();
    
    // Return the list of devices as a JSON response
    res.json(devices);
  } catch (error) {
    // Handle errors and send an error response 
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
