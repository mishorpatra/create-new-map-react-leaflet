import React, {useEffect, useRef} from 'react'
import { Map, TileLayer, Marker, Polygon, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { makeStyles, Box } from '@material-ui/core'

//components
import Lift from './Lift'


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
    },
    lift: {
      position: 'fixed',
      zIndex: 999,
      bottom: '40%',
      left: '5%'
    }
  })


const defaultZoom = 18


const pin = new Icon({
  iconUrl: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/344/external-map-pin-user-interface-smashingstocks-glyph-smashing-stocks.png',
  iconSize: [25, 25]
})
const path = new Icon({
  iconUrl: 'https://img.icons8.com/windows/344/square-full.png',
  iconSize: [25, 25]
})

const GlobalView = ({coordinates, floorplan, setFloor, setFloorPlan, venue, building, setRooms, rooms}) => {
    const mapRef = useRef();
    const classes = useStyle()
    console.log(floorplan)
    

   
    return (coordinates && !floorplan)? (
        <Map ref={mapRef} center={coordinates} zoom={defaultZoom} className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2}>
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              maxZoom={25}
              maxNativeZoom={19}
              />
            <Marker map={mapRef} position={coordinates} icon={pin} />
        </Map>
    ): (coordinates && floorplan) ? (
      <Map ref={mapRef} center={[floorplan.coordinates[0].globalRef.lat, floorplan.coordinates[0].globalRef.lng]} zoom={defaultZoom+2} className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2}>
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              maxZoom={25}
              maxNativeZoom={19}
              />
            
            <Polygon color='#d3cabf' opacity={0.1} fillOpacity={1} weight={1} lineCap="round" lineJoin='round' fill="#dad1c8" positions={
              [
                [floorplan.coordinates[0].globalRef.lat, floorplan.coordinates[0].globalRef.lng],
                [floorplan.coordinates[1].globalRef.lat, floorplan.coordinates[1].globalRef.lng],
                [floorplan.coordinates[2].globalRef.lat, floorplan.coordinates[2].globalRef.lng],
                [floorplan.coordinates[3].globalRef.lat, floorplan.coordinates[3].globalRef.lng],
              ]
            } />
            {
              rooms?.map(room => {
                var points = room.coordinates.split(',')
                console.log(points)
              })
            }
            <Box className={classes.lift}>
              <Lift  setLevel={setFloor} setFloorPlan={setFloorPlan} venue={venue} building={building} setRooms={setRooms} />
            </Box>
        </Map>
    ): <p>Dont have coordinates</p>
}

export default GlobalView