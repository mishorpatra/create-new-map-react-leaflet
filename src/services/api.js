import axios from 'axios'

import { getGlobalPoints } from './convert'


export const getVenues = async () => {
    try {
        let response = await axios.post("http://inclunav.apps.iitd.ac.in/node/wayfinding/v1/app/venue-list")
        return response.data
    } catch(error) {
        console.log('Error while getting the venues ', error)
    }
}
/*export const getBuildings = async (venue_name) => {
    let data=`{\n    \"venueName\":\"" + ${venue_name} + "\"\n}`
    console.log(venue_name)
    try {
        let response = await axios.post(`https://inclunav.apps.iitd.ac.in/node/wayfinding/v1/app/building-list/`, data)
        console.log(response.data)
    } catch(error) {
        console.log('Error while getting the buildings ', error)
    }
  
}*/

export const getBuildingData = async (venue_name, building_name, floor) => {
    try {
        let response = await axios.get(`https://inclunav.apps.iitd.ac.in/node/wayfinding/v1/global-ref/${venue_name}/${building_name}/${floor}`)
        return response.data
    } catch(error) {
        console.log('Error while getting the building data ', error)
    }
}

export const getRoomsData = async (venue_name, building_name) => {
    
    
    try {
        let response = await axios.get(`http://inclunav.apps.iitd.ac.in/node/wayfinding/v1/app/android-navigation/${venue_name}/${building_name}/null`)
        //console.log(response.data)


        let data = response.data
        //console.log(data)
        let floors = [...new Set(data.map(s => s.floor))]
        //extract the floors
        //polygon data or nonwalkables of all floors
        
        let poly_data = data.slice(data.length - floors.length,data.length);
        console.log(poly_data.global)
        let red_data = data.slice(0, data.length - floors.length);
        // console.log(floors);
        let fdata=poly_data.map(s=>s.floor)
        const ldata=poly_data.map(s=>s.properties.floorLength)
          



        return response.data
    }
    catch (error) {
        console.log('Error while getting the whole building data ', error)
    }
}

export const getGlobalCoords = (venue_name, building_name, setGlobalCoords, setLandmarks) => {
    getGlobalPoints(venue_name, building_name, setGlobalCoords, setLandmarks)

    
}


