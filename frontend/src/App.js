import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Industries from './Industries/Industries';
import Devices from './Devices/Devices';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>IoT Device Management</h1>
          <nav>
            <ul>
              <li>
                <Link to="/industries">Industries</Link>
              </li>
              <li>
                <Link to="/devices">Devices</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path="/industries" element={<Industries />} />
            <Route path="/devices" element={<Devices />} />
          </Routes>
        </div>

        {/* Add space between sections */}
        <div className="section-space"></div>
      </div>
    </Router>
  );
}

export default App;
