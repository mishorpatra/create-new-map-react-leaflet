import React, {useState} from 'react'
import { Box, Typography, TextField, Button, makeStyles, Dialog, CircularProgress } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtp, addUser } from '../../services/api'

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
        minHeight: '300px',
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
    link: {
        color: '#36e0c2',
        textDecoration: 'none'
    },
    heading: {
        color: '#36e0c2',
    },
    subHeading: {
        color: '#333',
        alignSelf: 'flex-start',
        paddingLeft: 35,
        lineHeight: 0
    },
    form: {
        width: '80%'
    },
    check: {
        position: 'relative',
        left: 10,
        bottom: 5
    }
})

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Signup = () => {
    const classes = useStyle()
    const [open, setOpen] = useState(false)
    const [verified, setVerified] = useState(false)
    const [user, setUser] = useState(initialValues)
    const [loading, setLoading] = useState(false)
    const [loadingSignup, setLoadingSignup] = useState(false)
    const [otp, setOtp] = useState('')
    const [inputOtp, setInputOtp] = useState('')

    const navigate = useNavigate()


    const handleClose = () => {
        setOpen(false)
    }
    const handleOtp = async () => {
        setLoading(true)
        let response = await sendOtp(user.email)
        setLoading(false)
        if(response.status == 201) {
            alert(response.data.message)
            return
        }
        setOtp(response.data.otp)
        setTimeout(() => {
            setOtp('')
        }, 300000)
        setOpen(true)
    }
    const handleOtpChange = (e) => {
        setInputOtp(e.target.value)
    }
    const handleVerify = () => {
        if(otp === inputOtp) {
            setVerified(true)
            handleClose()
        }
        else alert('OTP did not match!')
    }
    const handleSignUp = async () => {
        setLoadingSignup(true)
        await addUser(user)
        setLoadingSignup(false)
        navigate('/signin')
        alert('User saved successfully')
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    return !verified ? (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.heading} variant='h5'>Verify your Email </Typography>
                <Box className={classes.form}>
                    <TextField variant='outlined' label="Email" type='email' className={classes.input} name='email' onChange={(e) => handleChange(e)} />
                </Box>
                {!loading && <Button variant='contained' style={{background: user.email ? '#36e0c2' : '#eee'}} className={classes.submit} disabled={!user.email} onClick={() => handleOtp()}>Send OTP</Button>}
                {loading && <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit} ><CircularProgress size={22} color='#fff' /></Button>}
                <Box className={classes.actions}>
                <Link to='/signin' className={classes.link}><Typography>Back to Sign in!</Typography></Link>
                </Box>
            </Box>
            <Dialog open={open} onClose={() => handleClose()} >
                <Box className={classes.container}>
                    <Typography className={classes.heading} variant='h5'>Enter OTP sent to<br/><span style={{color: '#000', fontSize: '80%'}}>{user.email}</span> </Typography>
                    <Box className={classes.form}>
                        <TextField variant='outlined' label="6-digit otp" type='email' className={classes.input} onChange={(e) => handleOtpChange(e)} />
                    </Box>
                    <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit} onClick={() => handleVerify()}>verify</Button>
                </Box>
            </Dialog>
        </Box>
    ) :
    <Box className={classes.component}>
            <Box className={classes.container} style={{height: 500}}>
                <Typography className={classes.heading} variant='h5'>Create a new account</Typography>
                <Box className={classes.form}>
                    <TextField variant='outlined' label="Email" value={user.email} disabled className={classes.input} />
                    <TextField variant='outlined' label="Full Name" name='name' className={classes.input} onChange={(e) => handleChange(e)} />
                    <TextField variant='outlined' label="Password" name='password' className={classes.input} onChange={(e) => handleChange(e)} />
                    <Box style={{display: 'flex', position: 'relative', left: 23.5, alignItems: 'center'}}>
                        <TextField variant='outlined' label="Confirm Password" name='confirmPassword' className={classes.input} onChange={(e) => handleChange(e)} />
                        {user.confirmPassword && user.confirmPassword === user.password && <Box className={classes.check}><CheckCircle style={{color: '#32e0c2'}} /></Box>}
                    </Box>
                </Box>
                {!loadingSignup && <Button variant='contained' style={{background: (user.email && user.password && user.confirmPassword) ? '#36e0c2':'#eee'}} className={classes.submit} disabled={!user.email || !user.password || !user.confirmPassword} onClick={() => handleSignUp()} >Sign up</Button>}
                {loadingSignup && <Button variant='contained'className={classes.submit} ><CircularProgress size={22} color='#fff' /></Button>}

                <Box className={classes.actions}>
                <Link to='/signin' className={classes.link}><Typography>New user? Sign Up!</Typography></Link>
                </Box>
            </Box>
        </Box>
}

export default Signup