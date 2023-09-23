import React from 'react';
import './App.css';
import Industries from './Industries/Industries'; // Import the Industries component
import Devices from './Devices/Devices'; // Import the Devices component

function App() {
  return (
    <div className="App">
      <Industries /> {/* Render the Industries component */}
      <Devices /> {/* Render the Devices component */}
    </div>
  );
}

export default App;
