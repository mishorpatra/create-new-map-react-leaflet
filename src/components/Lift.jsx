import React, { useState, useEffect } from "react";
import { Box, makeStyles, Typography } from '@material-ui/core'
import { getBuildingData, getRoomsData } from "../services/api";
import { numToString, stringToNum } from "../services/neumericConvert";



const useStyle = makeStyles({
    lift: {
        background: '#787878',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        height: 'max-content',
        borderRadius: 5
    },
    floor: {
        width: 60,
        height: 60,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 5,
        '&:hover': {
            background: '#555 !important'
        }
    }
})
let floors
let poly_data
let fdata

const Lift = ({setLevel, level, setFloorPlan, venue, building, setRooms, rooms}) => {
    const classes = useStyle()
    const [floor, setFloor] = useState(0)

   // console.log(floor, level)

    if (rooms) floors = [...new Set(rooms.map(s => s.floor))]
    //extract the floors
    //polygon data or nonwalkables of all floors
    
    if(rooms) poly_data = rooms.slice(rooms.length - floors.length,rooms.length)
    //console.log(poly_data)
    // console.log(floors);
    var newFloors = []
    floors && floors.map((floor, idx) => {
        newFloors.push(stringToNum(idx))
    })
    //console.log(newFloors)
    if(poly_data) fdata=poly_data.map(s=>s.floor)

  
    
   

    const handleClick = async (e, step) => {
        document.querySelector(`#floor${floor}`).style.background='#787878'
        setFloor(e)
        setLevel(step)
        document.querySelector(`#floor${e}`).style.background='#333'
        let response = await getBuildingData(venue.venueName, building, step)
        setFloorPlan(response)
        response = await getRoomsData(venue.venueName, building, step)
        setRooms(response)
    }
 
    return (
        <Box className={classes.lift} >
            {
                newFloors && newFloors.map(data => (
                    <Box style={{background: data=='ground' && floor==0 ? '#333': '#787878'}} className={classes.floor} id={`floor${numToString(data)}`} onClick={() => handleClick(numToString(data), data)}><Typography>L{numToString(data)}</Typography></Box>
                ))
            }
        </Box>
    )
}

export default Lift