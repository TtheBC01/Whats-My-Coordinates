import React from 'react';
import logo from './compass.png';
import './App.css';
import Coordinates from './Coordinates';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Click the compass to get your coordinates.
        </p>
        <Coordinates />
      </header>
    </div>
  );
}

export default App;
