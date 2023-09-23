import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: '', description: '', industry: '' });
  const [updatingDevice, setUpdatingDevice] = useState(null);
  const [updatedDeviceData, setUpdatedDeviceData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleCreateDevice = () => {
    // Make a POST request to create a new device
    axios.post('http://localhost:5000/api/devices', newDevice)
      .then((response) => {
        // Add the created device to the devices array
        setDevices([...devices, response.data]);
        // Clear the form fields
        setNewDevice({ name: '', description: '', industry: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateDevice = (device) => {
    setUpdatingDevice(device);
    setUpdatedDeviceData({
      name: device.name,
      description: device.description,
    });
  };

  const handleSaveUpdate = () => {
    // Make a PUT request to update the device using updatedDeviceData
    // After a successful update, close the form and reset updatingDevice
    // You'll need to implement this part
  };

  const handleCancelUpdate = () => {
    // Close the form and reset updatingDevice
    setUpdatingDevice(null);
    setUpdatedDeviceData({
      name: "",
      description: "",
    });
  };

  const handleDeleteDevice = (deviceId) => {
    // Implement the logic to delete a device
    // Make a DELETE request to your backend API
    // You should remove the device from the devices array once it's deleted
  };

  useEffect(() => {
    // Fetch devices from your backend API
    axios.get('http://localhost:5000/api/devices')
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Devices</h2>
      <div>
        <h3>Create a New Device</h3>
        <input
          type="text"
          name="name"
          placeholder="Device Name"
          value={newDevice.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Device Description"
          value={newDevice.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="industry"
          placeholder="Device Industry"
          value={newDevice.industry}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateDevice}>Create</button>
      </div>
      <ul>
        {devices.map((device) => (
          <li key={device._id}>
            <h3>{device.name}</h3>
            <p>{device.description}</p>
            <p>{device.industry}</p>
            <button onClick={() => handleUpdateDevice(device)}>Update</button>
            <button onClick={() => handleDeleteDevice(device._id)}>Delete</button>
            {updatingDevice && updatingDevice._id === device._id && (
              <div>
                <input
                  type="text"
                  name="updatedName"
                  placeholder="Device Name"
                  value={updatedDeviceData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="updatedDescription"
                  placeholder="Device Description"
                  value={updatedDeviceData.description}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveUpdate}>Save Update</button>
                <button onClick={handleCancelUpdate}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Device;
