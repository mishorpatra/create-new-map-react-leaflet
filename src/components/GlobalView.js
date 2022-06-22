import React, {useEffect, useRef} from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { makeStyles, Typography, TextField, Button, Box } from '@material-ui/core'


const useStyle = makeStyles({
    mapView: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
    },
    formBx: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      marginBottom: 10,
      width: 300,
      height: '50%'
    },
    component: {
      flexDirection: 'column'
    }
  })


const initialPosition = [22.572645, 88.363892];
const defaultZoom = 25
const initialCoordinates = {
  lat: '',
  lng: ''
}

const pin = new Icon({
  iconUrl: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/344/external-map-pin-user-interface-smashingstocks-glyph-smashing-stocks.png',
  iconSize: [25, 25]
})

const GlobalView = ({coordinates}) => {
    const mapRef = useRef();
    const classes = useStyle()
    console.log(coordinates)

   
    return coordinates? (
        <Map ref={mapRef} center={coordinates} zoom={defaultZoom} className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
            <Marker map={mapRef} position={coordinates} icon={pin} />
        </Map>
    ): <p>Do not have cords</p>
}

export default GlobalView