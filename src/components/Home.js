import React, {useState, useEffect} from 'react'
import { Box, makeStyles, InputLabel, MenuItem, FormControl, Select, Typography, AppBar, Toolbar, TextField, Dialog, Button, CircularProgress, Backdrop } from '@material-ui/core'
import { ArrowBack, ExitToApp } from '@material-ui/icons'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {  getVenues, getRoomsData, getBuildingData, getGlobalCoords } from '../services/api';
import useWindowDimentions from '../services/getWindowSize'
import { useNavigate } from 'react-router-dom';

//components
import GlobalView from './GlobalView';
import TabView from './TabView';

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
            marginTop: 10,
        },
    },
    navBar: {
        background: '#36e0c2', 
        opacity: '0.8',
        transition: 0.5,
        height: 'max-content',
        padding: 0,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            
        }
    },
    arrows: {
        display: 'none',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 9999,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            display: 'flex'
        }
    },
    logout: {
        position: 'fixed',
        right: '2%',
        top: '10%',
        cursor: 'pointer'
    },
    dialog: {
        padding: '25px 35px'
    },
    DActions: {
        marginTop: 40,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }
  }));

const initialCords = [ 28.644800, 77.216721]
const filter = createFilterOptions()
const Home = ({  }) => {

    const navigate = useNavigate()

   /* useEffect(() => {
        setUser(JSON.parse(window.sessionStorage.getItem("user")));
      }, []);*/
//const navigate = useNavigate()

   //console.log(localStorage)
   if(!localStorage.user || localStorage.user == 'undefined') navigate('/signin')

    const { width } = useWindowDimentions()
    
    

    const classes = useStyles();
    const [venue, setVenue] = useState('');
    const [openVenue, setOpenVenue] = useState(true);
    const [openBuilding, setOpenBuilding] = useState(true)
    const [venues, setVenues] = useState()
    const [building, setBuilding] = useState()
    const [coordinates, setCoordinates] = useState(initialCords)
    const [floorplan, setFloorPlan] = useState()
    const [value, setValue] = useState({title: 'All'})
    const [floor, setFloor] = useState('ground')
    const [rooms, setRooms] = useState()
    const [globalCoords, setGlobalCoords] = useState()
    const [landmarks, setLandmarks] = useState()
    const [open, setOpen] = useState(false)
    const [backdrop, setBackdrop] = useState(false)

    useEffect(() => {
        const fetchVenues = async () => {
            //setBackdrop(true)
            let response = await getVenues()
            //setBackdrop(false)
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
        setOpenBuilding(true)
        if(event.target.value.coordinates) setCoordinates([event.target.value.coordinates[0], event.target.value.coordinates[1]])
        setFloorPlan(null)
       // await fetchBuildings(event.target.value.venueName)
    };
    const handleChangeBuilding = async (event) => {
        setBackdrop(true)
        setBuilding(event.target.value)
        setFloor('ground')
        setValue({title: 'All'})
        let response = await getBuildingData(venue.venueName, event.target.value, floor)
        setFloorPlan(response)
        response = await getRoomsData(venue.venueName, event.target.value, floor)
        setRooms(response)
        getGlobalCoords(venue.venueName, event.target.value, setGlobalCoords, setLandmarks)
        setBackdrop(false)
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

    const handleNavBar = () => {
        const navBar = document.querySelector('#nav_bar').style
        navBar.display = navBar.display == 'none' ? 'block' : 'none' 
    }
    const handleBack = () => {
        if(building) setBuilding(null)
        if(!building && venue) setVenue('')
    }

   const handleLogout = () => {
        localStorage.clear()
        navigate('/signin')
    }
    return !venues ? <CircularProgress color='#787878' size={25} style={{
        position: 'absolute',
        top: '48%',
        left: '48%'
    }} /> :
     (
        <Box className={classes.component}>
            <TabView 
                venues={venues} 
                venue={venue}
                openVenue={openVenue}
                handleCloseVenue={handleCloseVenue}
                handleOpenVenue={handleOpenVenue}
                handleChange={handleChange}
                building={building}
                setBuilding={setBuilding}
                openBuilding={openBuilding}
                handleCloseBuilding={handleCloseBuilding}
                handleOpenBuilding={handleOpenBuilding}
                handleChangeBuilding={handleChangeBuilding}
                value={value}
                setValue={setValue}
            />
            {/*<AppBar style={{}} className={classes.navBar} id='nav_bar' >
                <Toolbar>
            <Box className={classes.arrows} onClick={() => handleBack()} >
                {venue && <ArrowBack style={{margin: '10px 10px 0 0'}} />}
            </Box>
            <Box className={classes.inputBx} >
                <Box className={classes.container}>
                <FormControl className={classes.formControl} style={{display: (venue && width<958)?'none':'inherit'}} siz>
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
                <Typography className={classes.tag} style={{display: (venue && width<958)?'none':'inherit'}}>{venue.venueName || ""}</Typography>
                {venue && <FormControl className={classes.formControl} style={{display: (venue && building && width<958)?'none':'inherit'}}>
                    <InputLabel id="demo-controlled-open-select-label" color='#fff'>Select Building</InputLabel>
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
                        //console.log(value)
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
                        <TextField {...params} label="Search for rooms, offices etc..." variant="outlined"  />
                    )}
                />}
            </Box>
            </Toolbar>
            </AppBar>*/}
            {
                venue &&
                <GlobalView 
                    coordinates={coordinates} 
                    floorplan={floorplan} 
                    floor={floor} 
                    setFloor={setFloor} 
                    setFloorPlan={setFloorPlan}
                    venue={venue} 
                    building={building} 
                    setRooms={setRooms} 
                    rooms={rooms} 
                    globalCoords={globalCoords} 
                    landmarks={landmarks} 
                    value={value}/>
            }
            <ExitToApp className={classes.logout} onClick={() => setOpen(true)} />
            <Dialog open={open} >
                <Box className={classes.dialog}>
                <Typography variant='h6' style={{color: '#f00'}}>Do you want to logout?</Typography>
                <Box className={classes.DActions}>
                    <Button onClick={() => setOpen(false)} variant='outlined' size='small' style={{
                                                                border: '1px solid #36e0c2', 
                                                                textTransform: 'capitalize', 
                                                                background: '#fff', 
                                                                color: '#36e0c2',
                                                                marginRight: 10
                                                            }} >Cancel</Button>
                    <Button onClick={() => handleLogout()} variant='contained' size='small' style={{
                                                                border: 'none', 
                                                                textTransform: 'capitalize', 
                                                                background: '#36e0c2', 
                                                                color: '#fff', 
                                                                boxShadow: 'none'
                                                            }} >Confirm</Button>
                </Box>
                </Box>
            </Dialog>
            <Backdrop className={classes.backdrop} open={backdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

const blocks = [
   {title: 'All'},
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