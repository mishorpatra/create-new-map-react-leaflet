import React, {useEffect, useRef, useState} from 'react'
import { Map, TileLayer, Marker, Polygon, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { makeStyles, Box, Typography, Button } from '@material-ui/core'
import { Phone, Email, Language, ArrowBack, RateReview } from '@material-ui/icons'


//components
import Lift from './Lift'
import Rate from './Rating'

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
    },
    dialog: {
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      background: '#fff',
      width: '100%',
    },
    connenct: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    },
    option: {
      textDecoration: 'none',
      color: '#000',
      margin: '0 10px'
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
const parking = new Icon({
  iconUrl: 'https://img.icons8.com/ios/344/parking.png',
  iconSize: [25, 25]
})
const person = new Icon({
  iconUrl: 'https://img.icons8.com/ios-glyphs/344/user-male-circle.png',
  iconSize: [25, 25]
})
const man = new Icon({
  iconUrl: 'https://img.icons8.com/pastel-glyph/344/standing-man--v2.png',
  iconSize: [25, 25]
})
const woman = new Icon({
  iconUrl: 'https://img.icons8.com/ios-filled/344/standing-woman.png',
  iconSize: [25, 25]
})
const lift = new Icon({
  iconUrl: 'https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/344/external-lift-hospitality-inipagistudio-mixed-inipagistudio.png',
  iconSize: [25, 25]
})
const stairs = new Icon({
  iconUrl: 'https://img.icons8.com/pastel-glyph/344/staircase--v2.png',
  iconSize: [25, 25]
})
const water = new Icon({
  iconUrl: 'https://img.icons8.com/ios-filled/344/drinking-fountain.png',
  iconSize: [25, 25]
})
const noIcon= new Icon({
  iconUrl: 'https://img.icons8.com/ios-filled/344/drinking-fountain.png',
  iconSize: [0, 0]
})

var inx = 0

const GlobalView = ({coordinates, floorplan, setFloor, setFloorPlan, venue, building, setRooms, rooms, globalCoords, floor, landmarks}) => {
    const mapRef = useRef();
    const classes = useStyle()
    //console.log(floor)
    //console.log(globalCoords)
    globalCoords && globalCoords.map(gc => {
      if(gc.floor === floor) inx = globalCoords.indexOf(gc)
    })
    landmarks && console.log(landmarks[0])

    const [open, setOpen] = useState(false)
    const [landmarkData, setLandmarkData] = useState()
    const handleLandmark = (landmark) => {
      setOpen(true)
      setLandmarkData(landmark)
    }

   
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
    ): (coordinates && floorplan && !globalCoords) ? (
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
            {/*< Polygon color='#000'  opacity={0.7} fillOpacity={0} weight={3} lineCap="round" lineJoin='round'  positions={
             floorplan.parkingCoords.map(parks => {
                return [parks.lat, parks.lon]
              })
            } />
           <Marker ref={mapRef} position={[(parseFloat(floorplan.parkingCoords[0].lat)+parseFloat(floorplan.parkingCoords[2].lat)+parseFloat(floorplan.parkingCoords[1].lat))/3, (parseFloat(floorplan.parkingCoords[0].lon)+parseFloat(floorplan.parkingCoords[2].lon)+parseFloat(floorplan.parkingCoords[1].lon))/3]  } icon={parking} />
           */}
            <Box className={classes.lift}>
              <Lift  setLevel={setFloor} setFloorPlan={setFloorPlan} venue={venue} building={building} setRooms={setRooms} rooms={rooms} />
            </Box>
        </Map>
    ): <Map ref={mapRef} center={[floorplan.coordinates[0].globalRef.lat, floorplan.coordinates[0].globalRef.lng]} zoom={defaultZoom+2} className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
          maxZoom={25}
          maxNativeZoom={19}
          />
          {console.log("This is ", globalCoords[0].global[0][0][1], globalCoords[0].global[0][0][0])}
         {/*<Polyline color='#000' opacity={1} fillOpacity={1} weight={1} lineCap="round" lineJoin='round' fill='#000' positions={
          globalCoords[0].global[0].map(crd => {
            return [crd[1], crd[0]]
          })
         } />*/}

        
        
        
        <Polygon color='#d3cabf' opacity={0.1} fillOpacity={1} weight={1} lineCap="round" lineJoin='round' fill="#dad1c8" positions={
          [
            [floorplan.coordinates[0].globalRef.lat, floorplan.coordinates[0].globalRef.lng],
            [floorplan.coordinates[1].globalRef.lat, floorplan.coordinates[1].globalRef.lng],
            [floorplan.coordinates[2].globalRef.lat, floorplan.coordinates[2].globalRef.lng],
            [floorplan.coordinates[3].globalRef.lat, floorplan.coordinates[3].globalRef.lng],
          ]
        } />
        {/*< Polygon color='#000'  opacity={0.7} fillOpacity={0} weight={3} lineCap="round" lineJoin='round'  positions={
        floorplan.parkingCoords.map(parks => {
            return [parks.lat, parks.lon]
          })
        } />
        <Marker ref={mapRef} position={[(parseFloat(floorplan.parkingCoords[0].lat)+parseFloat(floorplan.parkingCoords[2].lat)+parseFloat(floorplan.parkingCoords[1].lat))/3, (parseFloat(floorplan.parkingCoords[0].lon)+parseFloat(floorplan.parkingCoords[2].lon)+parseFloat(floorplan.parkingCoords[1].lon))/3]  } icon={parking} />*/}
         {
            globalCoords[inx].global.map(glb_crd => (
              <Polyline color='#000' opacity={1} weight={3} lineCap='round' lineJoin='round'  positions={
                glb_crd.map(latlng => {
                  return [latlng[1], latlng[0]]
                })

              }  />
            ))
         }
        
      
      {
        landmarks && landmarks.map(landmark => (
          landmark.properties.latitude && landmark.floor === floor && landmark.name && <Marker ref={mapRef} position={[landmark.properties.latitude, landmark.properties.longitude]} onclick={() => handleLandmark(landmark)} icon={
            landmark.name=='SIT Entry' || landmark.name== 'Seminar Hall' || landmark.name== 'Library' || landmark.name== 'Assistech Lab' ? person :
            landmark.name=='Lift-3' || landmark.name== 'Lift-1' || landmark.name== 'Lift-2' ? lift :
            landmark.name=='Stairs-1' || landmark.name== 'First floor stair' || landmark.name=='Second floor stair' ? stairs :
            landmark.name=='Female Washroom 1' ? woman :
            landmark.name=='Water Point' || landmark.name== 'Drinking Water' || landmark.name== 'Drinking Water Point 1' ? water :
            landmark.name=='Male Washroom 1' ? man : noIcon
          } />

        ))
      }
     

        <Box className={classes.lift}>
          <Lift  setLevel={setFloor} setFloorPlan={setFloorPlan} venue={venue} building={building} setRooms={setRooms} rooms={rooms} />
        </Box>
        <Box className={classes.dialog} style={{display: open ? 'block' : 'none'}}>
          <Box style={{position: 'absolute', top: '5%', left: '1%', cursor: 'pointer'}} onClick={() => setOpen(false)}><ArrowBack /></Box>
            {landmarkData && 
            <Box>
              <Typography style={{marginBottom: 10, fontSize: 16}}>{landmarkData.name}</Typography>
              <Box className={classes.connect}>
                {landmarkData.properties.contactNo && <a href={`tel:${landmarkData.properties.contactNo}`} className={classes.option}><Phone /></a>}
                {landmarkData.properties.email && <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${landmarkData.properties.email}`} target="_blank" className={classes.option}><Email /></a>}
                {landmarkData.properties.url && <a href={`${landmarkData.properties.url}`} target='_blank' className={classes.option}><Language /></a>}
                
              </Box>
              {landmarkData.properties.timings && <Typography>{landmarkData.properties.timings}</Typography>}
              <Box style={{marginBottom: 10}}>
                <Typography>Add a Review</Typography>
                <textarea style={{resize: 'none', width: '20vw', height: '15vh'}}  ></textarea><br />
                <Rate />
                <Button variant='contained' style={{background: 'green', color: '#fff'}}>Submit</Button>
              </Box>
            </Box>}
        </Box>
    </Map>
}

export default GlobalView