import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//components
import GlobalView from './components/GlobalView';
import Home from './components/Home'
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Settings from './components/Settings';
import Locate from './components/Locate';



function App() {

const [user, setUser] = useState()
const [darkmode, setDarkmode] = useState(true)




  return (
    <div className="App" >
      <BrowserRouter basename='/exibition-new'>
        <Routes>
          <Route exact path='/signin' element={<Login setUser={setUser} user={user} darkmode={darkmode} setDarkmode={setDarkmode} />} />
          <Route exact path='/signup' element={<Signup darkmode={darkmode} setDarkmode={setDarkmode} />} />
          <Route exact path='/' element={<Home user={user} setUser={setUser} darkmode={darkmode} setDarkmode={setDarkmode} />} />
          <Route exact path='/settings' element={<Settings />} /> 
          <Route exact path='/locate/:id' element={<Locate />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
