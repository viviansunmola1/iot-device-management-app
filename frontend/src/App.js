import React from 'react';
import './App.css';
import Industries from './Industries/Industries'; // Import the Industries component
import Devices from './Devices/Devices'; // Import the Devices component

function App() {
  return (
    <div className="App">
      <h1>IoT Device Management</h1>
      <h2>Industries</h2>
      <Industries /> {/* Render the Industries component */}
      <h2>IoT Devices</h2>
      <Devices /> {/* Render the Devices component */}
    </div>
  );
}

export default App;
