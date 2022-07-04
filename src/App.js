import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import GlobalView from './components/GlobalView';
import Home from './components/Home'
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import AddDevice from './components/admin/AddDevice'



function App() {

const [user, setUser] = useState()




  return (
    <div className="App" >
      <BrowserRouter basename='/exibition-new'>
        <Routes>
          <Route exact path='/signin' element={<Login setUser={setUser} user={user} />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/admin$Mishor_3003' element={<AddDevice />} />
          <Route exact path='/' element={<Home user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
