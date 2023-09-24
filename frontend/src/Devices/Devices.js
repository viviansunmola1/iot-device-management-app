import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: '',
    description: '',
    industry: '', // Initialize industry as an empty string
    uniqueIdentifier: '', // Initialize uniqueIdentifier as an empty string
    fee: 0, // Initialize fee as 0
  });
  const [industryData, setIndustryData] = useState([]);
  const [updatingDevice, setUpdatingDevice] = useState(null);
  const [updatedDeviceData, setUpdatedDeviceData] = useState({
    name: '',
    description: '',
  });

  // Fetch industry data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/industries')
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
        setNewDevice({
          name: '',
          description: '',
          industry: '', // Reset industry after creating a device
          fee: 0, // Reset fee to 0
        });
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
    axios
      .put(`http://localhost:5000/api/devices/${updatingDevice._id}`, updatedDeviceData)
      .then((response) => {
        const updatedDevices = devices.map((device) =>
          device._id === response.data._id ? response.data : device
        );
        setDevices(updatedDevices);
        setUpdatingDevice(null);
        setUpdatedDeviceData({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelUpdate = () => {
    setUpdatingDevice(null);
    setUpdatedDeviceData({ name: '', description: '' });
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
      <div className='heading-space'>
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
          type="number"
          name="fee"
          placeholder="Fee"
          value={newDevice.fee}
          onChange={handleInputChange}
        />
        <select
          name="industry"
          value={newDevice.industry}
          onChange={handleInputChange}
        >
          <option value="">Select Industry</option>
          {industryData.map((industry) => (
            <option key={industry._id} value={industry._id}>
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
            <button onClick={() => handleUpdateDevice(device)}>Update</button>
            <button onClick={() => handleDeleteDevice(device._id)}>Delete</button>
            {updatingDevice && updatingDevice._id === device._id && (
              <div>
                <input
                  type="text"
                  name="updatedName"
                  placeholder="Device Name"
                  value={updatedDeviceData.name}
                  onChange={(e) =>
                    setUpdatedDeviceData({ ...updatedDeviceData, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="updatedDescription"
                  placeholder="Device Description"
                  value={updatedDeviceData.description}
                  onChange={(e) =>
                    setUpdatedDeviceData({ ...updatedDeviceData, description: e.target.value })
                  }
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

export default Devices;
