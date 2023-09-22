// Import dependecies 
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose")
require("dotenv").config() // Load environment variables from .env file

const mongoURI = process.env.MONGODB_URI; // Retrieve the Mongo URI from environment variables
console.log('MONGODB_URI:',mongoURI);


console.log('Before connecting to MongoDB');
mongoose
.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndex: true,
})
.then(() => {
  console.log('Connected to MongoDB'); // Connection succeeded
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error); // Connection failed
});

// Create Express application 
const app = express();

// Define API routes 
app.get('/', (req, res)=> {
  res.send('IoT Device Management')
});

// Define API routes for industry and device page 
// app.use('/api/industries', require('./routes/industryRoutes'));
// app.use('/api/devices', require('./routes/deviceRoutes'));

// Set up middleware 
app.use(bodyParser.json()); // Parse JSON request
app.use(cors()); // Enable CORS for cross-origin request

// Define port for Express server to listen on 
const port = process.env.PORT || 5000;

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})