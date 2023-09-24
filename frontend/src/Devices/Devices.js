import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: '', description: '', industry: '' });
  const [industryData, setIndustryData] = useState([]); // Store industry data

  // Fetch industry data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/industries') // Replace with your API endpoint
      .then((response) => {
        setIndustryData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleCreateDevice = () => {
    axios
      .post('http://localhost:5000/api/devices', newDevice)
      .then((response) => {
        setDevices([...devices, response.data]);
        setNewDevice({ name: '', description: '', industry: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteDevice = (deviceId) => {
    axios
      .delete(`http://localhost:5000/api/devices/${deviceId}`)
      .then(() => {
        const updatedDevices = devices.filter((device) => device._id !== deviceId);
        setDevices(updatedDevices);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/devices')
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
        <select
          name="industry"
          value={newDevice.industry}
          onChange={handleInputChange}
        >
          <option value="">Select Industry</option>
          {industryData.map((industry) => (
            <option key={industry._id} value={industry.name}>
              {industry.name}
            </option>
          ))}
        </select>
        <button onClick={handleCreateDevice}>Create</button>
      </div>
      <ul>
        {devices.map((device) => (
          <li key={device._id}>
            <h3>{device.name}</h3>
            <p>{device.description}</p>
            <p>{device.industry}</p>
            <button onClick={() => handleDeleteDevice(device._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Devices;
