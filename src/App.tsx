import React from 'react';
import './App.css';
import Header from './Header';
import Coordinates from './Coordinates';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <div className="App-body">
        <Coordinates />
      </div>
      <Footer />
    </>
  );
}

export default App;
