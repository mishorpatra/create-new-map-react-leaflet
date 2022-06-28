import React, { useRef, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import GlobalView from './components/GlobalView';
import Home from './components/Home'
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';



function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route exact path='/signin' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        {/*<Home />*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
