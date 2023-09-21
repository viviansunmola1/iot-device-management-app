// Import dependecies 
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express application 
const app = express();

// Set up middleware 
app.use(bodyParser.json()); // Parse JSON request
app.use(cors()) // Enable CORS for cross-origin request

// Define API routes 
app.get('/', (req, res)=> {
    res.send('IoT Device Management')
})

// Define API routes for industry and device page 
app.use ('/')
app.use ('/')

// Define port for server to listen on 
const port = process.env.PORT || 3000;

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})