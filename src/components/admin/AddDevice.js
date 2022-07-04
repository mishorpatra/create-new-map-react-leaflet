import React, {useState, useEffect} from 'react'
import { Box, Button, TextField, Typography } from "@material-ui/core"
import { addDevice, getDevices } from '../../services/api'

//components
import DeviceStatus from './DeviceStatus'


const AddDevice = () => {
    const [device, setDevice] = useState('')
    const [devices, setDevices] = useState()
    const handleAdd = async () => {
        await addDevice(device)
    }
    useEffect(() => {
        const fetchData = async () => {
            let response = await getDevices()
            setDevices(response)
        }
        fetchData()
    }, [devices])

    return (
        <Box>
            <Box>
                <TextField label='Enter device ID' onChange={(e) => setDevice(e.target.value)} />
                <Button onClick={() => handleAdd()}>Add Device</Button>
            </Box>
            <Box style={{marginTop: 50}}>
                {
                    devices?.map(devc => (
                        <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Box style={{display: 'flex'}}>
                            <Typography>{devc.device_code}</Typography>
                            <Typography style={{marginLeft: 50}}>{devc.available? 'Available':'Not Available'}</Typography>
                        </Box>
                        <DeviceStatus device_code={devc.device_code} />
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default AddDevice