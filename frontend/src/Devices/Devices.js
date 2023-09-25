import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Devices.css'; // Import the CSS file here


const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: '',
    industry: '',
    fee: '',
    warehouse: '',
  });
  const [industryData, setIndustryData] = useState([]);
  const [updatingDevice, setUpdatingDevice] = useState(null);
  const [updatedDeviceData, setUpdatedDeviceData] = useState({
    name: '',
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
    // Check required fields
    if (!newDevice.name || !newDevice.industry || !newDevice.fee || !newDevice.warehouse) {
      console.error('All fields are required.');
      return;
    }

    // Ensure fee is a valid number
    const feeAsNumber = parseFloat(newDevice.fee);
    if (isNaN(feeAsNumber) || feeAsNumber < 0) {
      console.error('Fee must be a valid number greater than or equal to 0.');
      return;
    }

    // Continue with the Axios request
    axios
      .post('http://localhost:5000/api/devices', newDevice, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setDevices([...devices, response.data]);
        setNewDevice({
          name: '',
          industry: '',
          fee: '',
          warehouse: '',
        });
      })
      .catch((error) => {
        console.error('Error creating device:', error);
      });
  };

  const handleUpdateDevice = (device) => {
    setUpdatingDevice(device);
    setUpdatedDeviceData({
      name: device.name,
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
        setUpdatedDeviceData({ name: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelUpdate = () => {
    setUpdatingDevice(null);
    setUpdatedDeviceData({ name: '' });
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
          autoComplete='off'
        />
        <input
          type="text"
          name="fee"
          placeholder="Fee"
          value={newDevice.fee}
          onChange={handleInputChange}
          autoComplete='off'
        />
        <input
          type="text"
          name="warehouse"
          placeholder="Warehouse"
          value={newDevice.warehouse}
          onChange={handleInputChange}
          autoComplete='off'
        />
        <select
          name="industry"
          value={newDevice.industry}
          onChange={handleInputChange}
          autoComplete='off'
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
      {device.industry && <p>Industry: {device.industry.name}</p>}
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
            name="updatedFee"
            placeholder="Fee"
            value={updatedDeviceData.fee}
            onChange={(e) =>
              setUpdatedDeviceData({ ...updatedDeviceData, fee: e.target.value })
            }
          />
          <input
            type="text"
            name="updatedWarehouse"
            placeholder="Warehouse"
            value={updatedDeviceData.warehouse}
            onChange={(e) =>
              setUpdatedDeviceData({ ...updatedDeviceData, warehouse: e.target.value })
            }
          />
          
          <select
            name="updatedIndustry"
            value={updatedDeviceData.industry}
            onChange={(e) =>
              setUpdatedDeviceData({ ...updatedDeviceData, industry: e.target.value })
            }
          >
            <option value="">Select Industry</option>
            {industryData.map((industry) => (
              <option key={industry._id} value={industry._id}>
                {industry.name}
              </option>
            ))}
          </select>
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
