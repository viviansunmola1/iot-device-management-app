// industryController.js

// Import the necessary model (e.g., Industry model)
const Industry = require('../models/Industry');

// Define the function to create a new industry
const createIndustry = async (req, res) => {
  try {
    console.log('createIndustry work')
    // Extract the data for the new industry from the request body
    const { name, description } = req.body;

    // Create a new industry instance
    const newIndustry = new Industry({
      name,
      description,
    });

    // Save the new industry to the database
    await newIndustry.save();

    // Respond with the created industry as a JSON response
    res.status(201).json(newIndustry);
  } catch (error) {
    // Handle errors and send an error response if necessary
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the industry' });
  }
};

// Define the function to get all industries
const getAllIndustries = async (req, res) => {
  try {
    console.log('get all industries work')
    const industries = await Industry.find();
    
    // Return the list of industries as a JSON response
    res.json(industries);
  } catch (error) {
    // Handle errors and send an error response if necessary
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching industries' });
  }
};

const updateIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Find the industry by ID and update its properties
    const updatedIndustry = await Industry.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedIndustry) {
      return res.status(404).json({ error: 'Industry not found' });
    }

    res.json(updatedIndustry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the industry' });
  }
};

// Define the function to delete an industry
const deleteIndustry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the industry by ID and remove it
    const deletedIndustry = await Industry.findByIdAndRemove(id);

    if (!deletedIndustry) {
      return res.status(404).json({ error: 'Industry not found' });
    }

    res.json({ message: 'Industry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the industry' });
  }
};


// Export the createIndustry and getAllIndustries functions so they can be used in routes
module.exports = {
  createIndustry,
  getAllIndustries,
  updateIndustry,
  deleteIndustry,
};
