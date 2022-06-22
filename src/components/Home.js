import React, {useState, useEffect} from 'react'
import { Box, makeStyles, InputLabel, MenuItem, FormControl, Select, Typography } from '@material-ui/core'
import {  getVenues } from '../services/api';

//components
import GlobalView from './GlobalView';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    component: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    formControl: {
        minWidth: 150
    },
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        zIndex: 999
    },
    tag: {
        position: 'fixed',
        top: '2%',
        left: '28.5vw'
    }
  }));

const initialCords = [ 28.644800, 77.216721]
const Home = () => {

    const classes = useStyles();
    const [venue, setVenue] = useState('');
    const [openVenue, setOpenVenue] = useState(false);
    const [openBuilding, setOpenBuilding] = useState(false)
    const [venues, setVenues] = useState()
    const [building, setBuilding] = useState()
    const [coordinates, setCoordinates] = useState(initialCords)

    useEffect(() => {
        const fetchVenues = async () => {
            let response = await getVenues()
            setVenues(response)
        }
        fetchVenues()
    }, [coordinates])

    const handleChange = (event) => {
        setVenue(event.target.value)
        if(event.target.value.coordinates) setCoordinates([event.target.value.coordinates[0], event.target.value.coordinates[1]])
    };
    const handleChangeBuilding = (event) => {
        setBuilding(event.target.value)
    }

    const handleCloseVenue = () => {
        setOpenVenue(false);
    };

    const handleOpenVenue = () => {
        setOpenVenue(true);
    };

    const handleCloseBuilding = () => {
        setOpenBuilding(false)
    }

    const handleOpenBuilding = () => {
        setOpenBuilding(true)
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Select Venue</InputLabel>
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openVenue}
                    onClose={handleCloseVenue}
                    onOpen={handleOpenVenue}
                    value={venue}
                    onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        venues?.data.map(data => (
                            <MenuItem value={data}  >{data.venueName}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                <Typography className={classes.tag}>{venue.venueName || ""}</Typography>
                {venue && <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Select Buildings</InputLabel>
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openBuilding}
                    onClose={handleCloseBuilding}
                    onOpen={handleOpenBuilding}
                    value={building}
                    onChange={handleChangeBuilding}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        venue?.buildingList?.map(data => (
                            <MenuItem value={data}>{data}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>}
            </Box>
            {
                venue &&
                <GlobalView coordinates={coordinates} />
            }
        </Box>
    )
}

export default Home