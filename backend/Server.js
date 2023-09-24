const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
console.log('MONGODB_URI:', mongoURI);

console.log('Before connecting to MongoDB');
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const routes = require('./routes/routes');

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your React app
};

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors(corsOptions)); // Enable CORS with the specified options

// Define API routes
app.get('/', (req, res) => {
  res.send('IoT Device Management');
});

// Define API routes for industry and device page
app.use('/api', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
