import React from 'react';
import logo from './logo.svg';
import './App.css';
import Coordinates from './Coordinates';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tutorial for using Geolocation API in a PWA.
        </p>
        <Coordinates />
      </header>
    </div>
  );
}

export default App;
