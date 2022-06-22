import React, { useRef, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { makeStyles, Typography, TextField, Button, Box } from '@material-ui/core';
import { Icon } from 'leaflet';

//components
import GlobalView from './components/GlobalView';
import Home from './components/Home'

const useStyle = makeStyles({
  component: {
    flexDirection: 'column'
  }
})



function App() {

  const classes = useStyle()

  /**
   * handleOnSetView
   */

  /*function handleOnSetView() {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.setView(disneyWorldLatLng, 14);
  }*/

  /**
   * handleOnFlyTo
   */
  /*const handleChange = (e) => {
    setCord({...cord, [e.target.name]: e.target.value})
  }
  function handleFind() {
    setPosition(cord)
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.flyTo([cord.lat, cord.lng], 14, {
      duration: 2
    });
  }*/



  return (
    <div className="App" >
      
      <Home />
    </div>
  );
}

export default App;
