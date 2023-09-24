import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Industries.css'; // Import the CSS file here

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [newIndustry, setNewIndustry] = useState({ name: '', description: '' });
  const [updatingIndustry, setUpdatingIndustry] = useState(null);
  const [updatedIndustryData, setUpdatedIndustryData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewIndustry({ ...newIndustry, [name]: value });
  };

  const handleCreateIndustry = () => {
    axios.post('http://localhost:5000/api/industries', newIndustry)
      .then((response) => {
        setIndustries([...industries, response.data]);
        setNewIndustry({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateIndustry = (industry) => {
    setUpdatingIndustry(industry);
    setUpdatedIndustryData({
      name: industry.name,
      description: industry.description,
    });
  };

  const handleSaveUpdate = () => {
    axios.put(`http://localhost:5000/api/industries/${updatingIndustry._id}`, updatedIndustryData)
      .then((response) => {
        const updatedIndustries = industries.map((industry) =>
          industry._id === response.data._id ? response.data : industry
        );
        setIndustries(updatedIndustries);
        setUpdatingIndustry(null);
        setUpdatedIndustryData({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelUpdate = () => {
    setUpdatingIndustry(null);
    setUpdatedIndustryData({ name: '', description: '' });
  };

  const handleDeleteIndustry = (industryId) => {
    axios.delete(`http://localhost:5000/api/industries/${industryId}`)
      .then(() => {
        const updatedIndustries = industries.filter((industry) => industry._id !== industryId);
        setIndustries(updatedIndustries);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/industries')
      .then((response) => {
        setIndustries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Industries</h2>
      <div className="heading-space">
        <h3>Create a New Industry</h3>
        <input
          type="text"
          name="name"
          placeholder="Industry Name"
          value={newIndustry.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Industry Description"
          value={newIndustry.description}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateIndustry}>Create</button>
      </div>
      <ul>
        {industries.map((industry) => (
          <li key={industry._id}>
            <div>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
              <button onClick={() => handleUpdateIndustry(industry)}>Update</button>
              <button onClick={() => handleDeleteIndustry(industry._id)}>Delete</button>
              {updatingIndustry && updatingIndustry._id === industry._id && (
                <div>
                  <input
                    type="text"
                    name="updatedName"
                    placeholder="Industry Name"
                    value={updatedIndustryData.name}
                    onChange={(e) =>
                      setUpdatedIndustryData({ ...updatedIndustryData, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="updatedDescription"
                    placeholder="Industry Description"
                    value={updatedIndustryData.description}
                    onChange={(e) =>
                      setUpdatedIndustryData({ ...updatedIndustryData, description: e.target.value })
                    }
                  />
                  <button onClick={handleSaveUpdate}>Save Update</button>
                  <button onClick={handleCancelUpdate}>Cancel</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Industries;
