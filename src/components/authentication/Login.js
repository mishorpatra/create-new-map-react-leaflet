import React from 'react'
import { Box, Typography, TextField, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyle = makeStyles({
    component: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#efefef'
    },
    container: {
        minWidth: '500px',
        minHeight: '400px',
        borderRadius: 10,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        marginBottom: 15
    },
    submit: {
        color: '#fff',
        textTransform: 'capitalize'
    },
    actions: {

    },
    link: {
        color: '#36e0c2',
        textDecoration: 'none'
    },
    heading: {
        alignSelf: 'flex-start',
        color: '#36e0c2',
        paddingLeft: 30,
    },
    subHeading: {
        color: '#333',
        alignSelf: 'flex-start',
        paddingLeft: 35,
        lineHeight: 0
    }
})

const Login = () => {
    const classes = useStyle()

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.heading} variant='h4'>Welcome to Inclunav! </Typography>
                <Typography className={classes.subHeading} variant='h6'>Your indoor navigation assistant</Typography>
                <Box className={classes.form}>
                    <TextField variant='outlined' label="Email" className={classes.input} />
                    <TextField variant='outlined' label="Password" className={classes.input} />
                </Box>
                <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit}>Sign in</Button>
                <Box className={classes.actions}>
                <Link to='/signup' className={classes.link}><Typography>New user? Sign Up!</Typography></Link>
                <Typography>Forget Password?</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Login