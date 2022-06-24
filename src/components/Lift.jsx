import React, { useState } from "react";
import { Box, makeStyles, Typography } from '@material-ui/core'
import { getBuildingData, getRoomsData } from "../services/api";



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

const Lift = ({setLevel, setFloorPlan, venue, building, setRooms, rooms}) => {
    const classes = useStyle()
    const [floor, setFloor] = useState(0)

    if (rooms) floors = [...new Set(rooms.map(s => s.floor))]
    //extract the floors
    //polygon data or nonwalkables of all floors
    
    if(rooms) poly_data = rooms.slice(rooms.length - floors.length,rooms.length)
    //console.log(poly_data)
    // console.log(floors);
    if(poly_data) fdata=poly_data.map(s=>s.floor)
    //console.log(fdata) 

   

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
            {/*<Box className={classes.floor} id='floor0' onClick={() => handleClick(0, 'ground')} ><Typography>0</Typography></Box>
            <Box className={classes.floor} id='floor1' onClick={() => handleClick(1, 'first')} ><Typography>1</Typography></Box>
            <Box className={classes.floor} id='floor2' onClick={() => handleClick(2, 'second')} ><Typography>2</Typography></Box>
    <Box className={classes.floor} id='floor3' onClick={() => handleClick(3, 'third')} ><Typography>3</Typography></Box>*/}
            {
                fdata && fdata.map(data => (
                    <Box className={classes.floor} id={`floor${fdata.indexOf(data)}`} onClick={() => handleClick(fdata.indexOf(data), data)}><Typography>L{fdata.length-fdata.indexOf(data)-1}</Typography></Box>
                ))
            }
        </Box>
    )
}

export default Lift