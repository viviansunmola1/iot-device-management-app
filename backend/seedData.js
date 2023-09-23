const mongoose = require('mongoose');
const Industry = require('./models/Industry'); // Import your Industry model
const Device = require('./models/Device'); // Import your Device model

// MongoDB URI setup
const mongoURI= 'mongodb+srv://iotdevicemanagement:iotdevicemanagement@cluster0.r2jgnx6.mongodb.net/iotdevicemanagement?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Insert industries
    const industriesData = [
      { name: 'Industry 1', description: 'Description for Industry 1' },
      { name: 'Industry 2', description: 'Description for Industry 2' },
    ];

    Industry.insertMany(industriesData)
      .then((industries) => {
        console.log('Industries inserted:', industries);

        // Insert devices
        const devicesData = [
          {
            name: 'Device 1',
            description: 'Description for Device 1',
            uniqueIdentifier: '123456',
            fee: 100,
            industry: industries[0]._id, // Reference the first industry
          },
          {
            name: 'Device 2',
            description: 'Description for Device 2',
            uniqueIdentifier: '789012',
            fee: 200,
            industry: industries[1]._id, // Reference the second industry
          },
        ];

        return Device.insertMany(devicesData);
      })
      .then((devices) => {
        console.log('Devices inserted:', devices);
        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
      })
      .catch((error) => {
        console.error('Error inserting devices:', error);
        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
