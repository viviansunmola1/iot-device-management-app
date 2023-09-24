import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Industries.css'; // Import the CSS file here

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [newIndustry, setNewIndustry] = useState({ name: '', description: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewIndustry({ ...newIndustry, [name]: value });
  };

  const handleCreateIndustry = () => {
    // Make a POST request to create a new industry
    axios.post('http://localhost:5000/api/industries', newIndustry)
      .then((response) => {
        // Add the created industry to the industries array
        setIndustries([...industries, response.data]);
        // Clear the form fields
        setNewIndustry({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateIndustry = (industry) => {
    // Implement the logic to update an industry
    // You can show a form to update the industry properties and make a PUT request
  };

  const handleDeleteIndustry = (industryId) => {
    // Implement the logic to delete an industry
    // Make a DELETE request to your backend API
  };

  useEffect(() => {
    // Fetch industries from your backend API
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Industries;
