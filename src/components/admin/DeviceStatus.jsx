import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { locateUser } from '../../services/api'

const DeviceStatus = ({ device_id }) => {
    const [origins, setOrigins] = useState()
    useEffect(() => {
        const fetchData = async () => {
            let response = await locateUser(device_id)
            setOrigins(response)
        }
        fetchData()
    })

    return (
        <Box style={{marginLeft: 10}}>
            <Typography>x: {origins?.x} </Typography>
            <Typography>y: {origins?.y} </Typography>
            <Typography>z: {origins?.z} </Typography>
        </Box>
    )
}

export default DeviceStatus