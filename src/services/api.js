import axios from 'axios'


export const getVenues = async () => {
    try {
        let response = await axios.post("http://inclunav.apps.iitd.ac.in/node/wayfinding/v1/app/venue-list")
        return response.data
    } catch(error) {
        console.log('Error while getting the venues ', error)
    }
}
export const getBuildings = async (venue_name) => {
    let data="{\n    \"venueName\":\"" + venue_name + "\"\n}"
    console.log(venue_name)
    try {
        let response = await axios.post("https://inclunav.apps.iitd.ac.in/node/wayfinding/v1/app/building-list", data)
        console.log(response.data)
    } catch(error) {
        console.log('Error while getting the buildings ', error)
    }
}