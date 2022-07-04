import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, makeStyles, CircularProgress } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/api'

const useStyle = makeStyles(theme => ({
    component: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#efefef',
        [theme.breakpoints.down('sm')]: {
            height: '95vh',
        }
    },
    container: {
        width: '500px',
        minHeight: '400px',
        borderRadius: 10,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        
        
    },
    input: {
        width: '90%',
        marginBottom: 15,
        
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
}))

const initialValues = {
    mobile: '',
    password: ''
}

const Login = ({ setUser, user }) => {
    const classes = useStyle()
    const [auth, setAuth] = useState(initialValues)
    const [loading, setLoading] = useState(false)

    /*useEffect(() => {
        window.sessionStorage.setItem("user", user);
      }, [user]);*/
      localStorage.setItem('user', JSON.stringify(user))

    const handleChange = (e) => { 
        setAuth({...auth, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setLoading(true)
        let response = await signIn(auth)
        setLoading(false)
        if(!response.data.success) {
            alert("Incorrect credentials")
            return
        }
        setUser(response.data)
        navigate('/')
        alert("Logged in successfully")
    }

    const handleForgotPass = () => {
        
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.heading} variant='h4'>Welcome to Inclunav! </Typography>
                <Typography className={classes.subHeading} variant='h6'>Your indoor navigation assistant</Typography>
                <Box className={classes.form}>
                    <TextField variant='outlined' label="Mobile Number" name='mobile' className={classes.input} onChange={(e) => handleChange(e)} />
                    <TextField variant='outlined' label="Password" name='password' type='password' className={classes.input} onChange={(e) => handleChange(e)} />
                </Box>
                {!loading && <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit} onClick={() => handleSubmit()}>Sign in</Button>}
                {loading && <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit}><CircularProgress style={{color: '#fff'}} size={20} /></Button>}

                <Box className={classes.actions}>
                <Link to='/signup' className={classes.link}><Typography>New user? Sign Up!</Typography></Link>
                <Typography onClick={() => handleForgotPass()} style={{cursor: 'pointer'}}>Forgot Password?</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Login