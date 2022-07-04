import React, {useEffect, useRef, useState} from 'react'
import { Map, TileLayer, Marker, Polygon, Polyline, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { makeStyles, Box, Typography, Button, Dialog } from '@material-ui/core'
import { Phone, Email, Language, ArrowBack, RateReview } from '@material-ui/icons'
import useWindowDimensions from '../services/getWindowSize';


//components
import Lift from './Lift'
import Rate from './Rating'

const useStyle = makeStyles(theme => ({
    mapView: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      [theme.breakpoints.down('sm')]: {
        height: '95vh'
      }
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
      bottom: '19%',
      right: '1%'
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
      margin: '0 10px',
      cursor: 'pointer'
    },
    form: {
      padding: '20px 25px',
      width: '20vw',
      [theme.breakpoints.down('sm')]: {
        width: '68vw',
        overflow: 'hidden'
      }
    }
  }))


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
  iconUrl: 'https://i.imgur.com/eMkL1sI.png',
  iconSize: [40, 40]
})
const man = new Icon({
  iconUrl: 'https://i.imgur.com/sNkSo2p.png',
  iconSize: [40, 40]
})
const woman = new Icon({
  iconUrl: 'https://i.imgur.com/EGs2yxZ.png',
  iconSize: [40, 40]
})
const lift = new Icon({
  iconUrl: 'https://i.imgur.com/BbAeOzv.png',
  iconSize: [40, 40]
})
const stairs = new Icon({
  iconUrl: 'https://i.imgur.com/xt4Uv3C.png',
  iconSize: [40, 40]
})
const water = new Icon({
  iconUrl: 'https://i.imgur.com/AEEUpIz.png',
  iconSize: [40, 40]
})
const noIcon= new Icon({
  iconUrl: 'https://img.icons8.com/ios-filled/344/drinking-fountain.png',
  iconSize: [0, 0]
})
const beacon = new Icon({
  iconUrl: 'https://i.imgur.com/yRy2aMn.png',
  iconSize: [40, 40]
})

var inx = 0

const GlobalView = ({coordinates, 
                    floorplan, 
                    setFloor, 
                    setFloorPlan, 
                    venue, 
                    building, 
                    setRooms, 
                    rooms, 
                    globalCoords, 
                    floor, 
                    landmarks,
                    value }) => {

    const { width } = useWindowDimensions()
    
    const mapRef = useRef();
    const classes = useStyle()
    //console.log(floor)
    //floorplan && console.log(floorplan.coordinates)
    //console.log(value)
    globalCoords && globalCoords.map(gc => {
      if(gc.floor === floor) inx = globalCoords.indexOf(gc)
    })
    //landmarks && console.log(landmarks[0])

    const [open, setOpen] = useState(false)
    const [landmarkData, setLandmarkData] = useState()
    const [zoom, setZoom] = useState(20)
    const [form, setForm] = useState(false)
    const handleLandmark = (landmark) => {
      setOpen(true)
      setLandmarkData(landmark)
    }

    const handleZoom = (e) => {
      setZoom(e.zoom)
    }

   
    return (coordinates && !floorplan)? (
        <Map ref={mapRef} center={coordinates} zoom={defaultZoom} className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2} zoomControl={false}>
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              maxZoom={25}
              maxNativeZoom={19}
              />
              <Box style={{marginBottom: 20}}>
                <ZoomControl position='bottomright'  />
              </Box>
            <Marker map={mapRef} position={coordinates} icon={pin} alt={venue.venueName} />
        </Map>
    ): (coordinates && floorplan && !globalCoords) ? (
      <Map ref={mapRef} 
          center={[
             (parseFloat(floorplan.coordinates[0].globalRef.lat)+parseFloat(floorplan.coordinates[2].globalRef.lat))/2, 
             (parseFloat(floorplan.coordinates[0].globalRef.lng)+parseFloat(floorplan.coordinates[2].globalRef.lng))/2
            ]} 
          zoom={ width<958 ? defaultZoom+1 : defaultZoom+2 } className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2} zoomControl={false}>

            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              maxZoom={25}
              maxNativeZoom={19}
              />
            <ZoomControl position='bottomright' />
            
            
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
    ): <Map ref={mapRef} 
            center={[
              (parseFloat(floorplan.coordinates[0].globalRef.lat)+parseFloat(floorplan.coordinates[2].globalRef.lat))/2, 
             (parseFloat(floorplan.coordinates[0].globalRef.lng)+parseFloat(floorplan.coordinates[2].globalRef.lng))/2
            ]} 
              zoom={width<958 ? defaultZoom+1 : defaultZoom+2 } className={classes.mapView} scrollWheelZoom={true} dragging={true} duration={2} zoomControl={false} onViewportChange={(e) => handleZoom(e)} >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
          maxZoom={25}
          maxNativeZoom={19}
          />
         {/*<Polyline color='#000' opacity={1} fillOpacity={1} weight={1} lineCap="round" lineJoin='round' fill='#000' positions={
          globalCoords[0].global[0].map(crd => {
            return [crd[1], crd[0]]
          })
         } />*/}

        
        <ZoomControl position='bottomright' />
        
        <Polygon color='#d3cabf' opacity={0.1} fillOpacity={1} weight={1} lineCap="round" lineJoin='round' fill="#dad1c8" positions={
          [
            [parseFloat(floorplan.coordinates[0].globalRef.lat)/*-0.00001*/, floorplan.coordinates[0].globalRef.lng],
            [parseFloat(floorplan.coordinates[1].globalRef.lat), floorplan.coordinates[1].globalRef.lng],
            [parseFloat(floorplan.coordinates[2].globalRef.lat)/*+0.00004*/, floorplan.coordinates[2].globalRef.lng],
            [parseFloat(floorplan.coordinates[3].globalRef.lat)/*+0.00004*/, floorplan.coordinates[3].globalRef.lng],
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
        value && landmarks && zoom>19 && landmarks.map(landmark => (
          landmark.properties.latitude && landmark.floor === floor && landmark.name && <Marker ref={mapRef} position={[landmark.properties.latitude, landmark.properties.longitude]}  alt={landmark.name} onclick={() => handleLandmark(landmark)} icon={
            landmark.element.type=='Rooms' && (value.title === 'All' || value.title === 'Rooms') ? person :
            landmark.element.subType=='lift' && (value.title === 'All' || value.title === 'lift') ? lift :
            landmark.element.subType == 'stairs' && (value.title === 'All' || value.title === 'stairs') ? stairs :
            landmark.properties.washroomType=='Female' && (value.title === 'All' || value.title === 'restRoom') ? woman :
            landmark.element.subType == 'drinkingWater' && (value.title === 'All' || value.title === "drinkingWater") ? water :
            landmark.properties.washroomType=='Male' && (value.title === 'All' || value.title === 'restRoom') ? man : 
            landmark.element.subType == 'beacons' && zoom>22 ? beacon : noIcon
          } />

        ))
      }
     

        <Box className={classes.lift}>
          <Lift  
            setLevel={setFloor} 
            level={floor} 
            setFloorPlan={setFloorPlan} 
            venue={venue} 
            building={building} 
            setRooms={setRooms} 
            rooms={rooms} />
        </Box>
        <Box className={classes.dialog} style={{display: open ? 'block' : 'none'}}>
          <Box style={{position: 'absolute', top: '5%', left: '1%', cursor: 'pointer'}} onClick={() => setOpen(false)}><ArrowBack /></Box>
            {landmarkData && 
            <Box>
              <Typography style={{marginBottom: 5, fontSize: 17, fontWeight: 600}}>{landmarkData.name}</Typography>
              <Box className={classes.connect}>
                {landmarkData.properties.contactNo && <a href={`tel:${landmarkData.properties.contactNo}`} className={classes.option}><Phone /></a>}
                {landmarkData.properties.email && <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${landmarkData.properties.email}`} target="_blank" className={classes.option}><Email /></a>}
                {landmarkData.properties.url && <a href={`${landmarkData.properties.url}`} target='_blank' className={classes.option}><Language /></a>}
                <a className={classes.option} onClick={() => setForm(true)} title='Feedback' ><RateReview /></a>
                
              </Box>
              {landmarkData.properties.timings && <Typography>{landmarkData.properties.timings}</Typography>}
            </Box>}
        </Box>
        <Dialog open={form} onClose={() => setForm(false)} >
        <Box className={classes.form}>
                <Typography style={{fontWeight: 600, fontSize: 18, marginLeft: 10}}>Add a Review</Typography>
                <textarea placeholder='Write something here...'  style={{resize: 'none', width: '90%', height: '15vh', borderRadius: 10, padding: '8px 10px', marginTop: 10}}  ></textarea><br />
                <Rate />
                <Button variant='contained' style={{background: 'green', color: '#fff'}} onClick={() => setForm(false)}>Submit</Button>
              </Box>
        </Dialog>
    </Map>
}

export default GlobalView