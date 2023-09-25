import React from 'react';
import './App.css';
import { TfiGithub } from 'react-icons/tfi';
import Coordinates from './Coordinates';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Coordinates />
      </header>
      <div className="social-container">
        <a href="https://github.com/TtheBC01/Whats-My-Coordinates"
          className="github">
          <TfiGithub />
        </a>
      </div>
    </div>
  );
}

export default App;
