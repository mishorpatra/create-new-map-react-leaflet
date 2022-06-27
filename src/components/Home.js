import React, {useState, useEffect} from 'react'
import { Box, makeStyles, InputLabel, MenuItem, FormControl, Select, Typography, AppBar, Toolbar, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {  getVenues, getRoomsData, getBuildingData, getGlobalCoords } from '../services/api';

//components
import GlobalView from './GlobalView';
import Lift from './Lift'

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
        zIndex: 999,
        wrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    inputBx: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    tag: {
        position: 'fixed',
        top: '3%',
        left: '22vw',
        color: '#000',
        textAlign: 'center',
        zIndex: -1,
        [theme.breakpoints.down('md')]: {
            left: '22vw'
        },
        [theme.breakpoints.down('sm')]: {
            left: '0',
            top: '2.7%',
            width: '100%',
        }
    },
    search: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 10
        },
    }
  }));

const initialCords = [ 28.644800, 77.216721]
const filter = createFilterOptions()
const Home = () => {

    const classes = useStyles();
    const [venue, setVenue] = useState('');
    const [openVenue, setOpenVenue] = useState(false);
    const [openBuilding, setOpenBuilding] = useState(false)
    const [venues, setVenues] = useState()
    const [building, setBuilding] = useState()
    const [coordinates, setCoordinates] = useState(initialCords)
    const [floorplan, setFloorPlan] = useState()
    const [value, setValue] = useState()
    const [floor, setFloor] = useState('ground')
    const [rooms, setRooms] = useState()
    const [globalCoords, setGlobalCoords] = useState()
    const [landmarks, setLandmarks] = useState()

    useEffect(() => {
        const fetchVenues = async () => {
            let response = await getVenues()
            setVenues(response)
        }
        fetchVenues()
    }, [coordinates])

    /*const fetchBuildings = async (venue_name) => {
        console.log(venue_name)
        let response = await getBuildings(venue_name)
        console.log(response)
    }*/

    const handleChange = (event) => {
        setVenue(event.target.value)
        if(event.target.value.coordinates) setCoordinates([event.target.value.coordinates[0], event.target.value.coordinates[1]])
        setFloorPlan(null)
       // await fetchBuildings(event.target.value.venueName)
    };
    const handleChangeBuilding = async (event) => {
        setBuilding(event.target.value)
        setFloor('ground')
        let response = await getBuildingData(venue.venueName, event.target.value, floor)
        setFloorPlan(response)
        response = await getRoomsData(venue.venueName, event.target.value, floor)
        setRooms(response)
        getGlobalCoords(venue.venueName, event.target.value, setGlobalCoords, setLandmarks)
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
            <AppBar style={{background: '#36e0c2', opacity: '0.8', paddingBottom: 5}}>
                <Toolbar>
            <Box className={classes.inputBx} >
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
                    <InputLabel id="demo-controlled-open-select-label" color='#fff'>Select Buildings</InputLabel>
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
                { venue && building && <Autocomplete
                    className={classes.search}
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                        setValue({
                            title: newValue,
                        });
                        } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            title: newValue.inputValue,
                        });
                        } else {
                        setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                        }

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={blocks}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                        return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                        return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                    }}
                    renderOption={(option) => option.title}
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Search for rooms, offices etc..." variant="outlined" />
                    )}
                />}
            </Box>
            </Toolbar>
            </AppBar>
            {
                venue &&
                <GlobalView coordinates={coordinates} floorplan={floorplan} floor={floor} setFloor={setFloor} setFloorPlan={setFloorPlan} venue={venue} building={building} setRooms={setRooms} rooms={rooms} globalCoords={globalCoords} landmarks={landmarks}/>
            }
        </Box>
    )
}

const blocks = [
   {title: 'Help Desk | Reception'},
   {title: 'Rooms'},
   {title: 'Security Room'},
   {title: 'Information Center'},
   {title: 'Transportation Service Till Building'},
   {title: 'lift'},
   {title: 'ramp'},
   {title: 'escalator'},
   {title: 'stairs'},
   {title: 'drinkingWater'},
   {title: 'kiosk'},
   {title: 'restRoom'},
   {title: 'Medical Room'},
   {title: 'Break Room'},
   {title: 'Change Room'},
   {title: 'Clock Room'},
   {title: 'Child | Baby Care'},
   {title: 'Food and Drinks'},
   {title: 'Trash Cans | Dustbin'}
]

export default Home