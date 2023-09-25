import React from 'react';
import './App.css';
import { TfiGithub } from 'react-icons/tfi';
import Coordinates from './Coordinates';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Coordinates />
        </header>
      </div>
      <footer className="footer">
        <div className='copyright'> Copyright © 2023 toddchapman.io</div>
        <div className='social'>
          <a href="https://github.com/TtheBC01/Whats-My-Coordinates"
            className='github'>
            <TfiGithub size='25px' />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
