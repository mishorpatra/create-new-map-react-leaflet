import React, {useState} from 'react'
import { Box, Typography, TextField, Button, makeStyles, Dialog, CircularProgress } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtp, addUser, checkOtp } from '../../services/api'



const useStyle = makeStyles(theme =>({
    component: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#efefef'
    },
    container: {
        width: '500px',
        minHeight: '300px',
        borderRadius: 10,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    containerDialog: {
        width: '500px',
        minHeight: '300px',
        borderRadius: 10,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '290px'
        }
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
}))

const initialValues = {
    name: '',
    mobile: '',
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
    const [inputOtp, setInputOtp] = useState('')
    const [verifying, setVerifying] = useState(false)

    const navigate = useNavigate()



    const handleClose = () => {
        setOpen(false)
    }
    const handleOtp = async () => {
        setLoading(true)
        let response = await sendOtp(user.mobile)
        setLoading(false)
        if(response && !response.data.success) {
            alert("Mobile verification failed")
            return
        }
        else setOpen(true)
    }
    const handleOtpChange = (e) => {
        setInputOtp(e.target.value)
    }
    const handleVerify = async () => {
        setVerifying(true)
        let response = await checkOtp({
            mobileNumber: user.mobile,
            otp: inputOtp
        })
        setVerifying(false)
        if(response.data.success !== 'approved') {
            alert('OTP did not match')
            return
        }
        else setVerified(true)
    }
    const handleSignUp = async () => {
        setLoadingSignup(true)
        let response = await addUser(user)
        setLoadingSignup(false)
        if(!response.data.success) {
            alert(response.data.message)
            return
        }
        navigate('/signin')
        alert('User saved successfully')
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    return !verified ? (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.heading} variant='h5'>Verify your Mobile </Typography>
                <Box className={classes.form}>
                    <TextField variant='outlined' label="Mobile Number" className={classes.input} name='mobile' onChange={(e) => handleChange(e)} />
                </Box>
                {!loading && <Button variant='contained' style={{background: user.mobile ? '#36e0c2' : '#eee'}} className={classes.submit} disabled={!user.mobile} onClick={() => handleOtp()}>Send OTP</Button>}
                {loading && <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit} ><CircularProgress size={22} color='#fff' /></Button>}
                <Box className={classes.actions}>
                <Link to='/signin' className={classes.link}><Typography>Back to Sign in!</Typography></Link>
                </Box>
            </Box>
            <Dialog open={open} onClose={() => handleClose()} >
                <Box className={classes.containerDialog}>
                    <Typography className={classes.heading} variant='h5'>Enter OTP sent to<br/><span style={{color: '#000', fontSize: '80%'}}>{user.email}</span> </Typography>
                    <Box className={classes.form}>
                        <TextField variant='outlined' label="6-digit otp" type='email' style={{width: '100%'}} onChange={(e) => handleOtpChange(e)} />
                    </Box>
                    {!verifying && <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit} onClick={() => handleVerify()}>verify</Button>}
                    {verifying && <Button variant='contained' style={{background: '#36e0c2'}} className={classes.submit}><CircularProgress color='#fff' size={22} /></Button> }
                </Box>
            </Dialog>
        </Box>
    ) :
    <Box className={classes.component}>
            <Box className={classes.container} style={{height: 500}}>
                <Typography className={classes.heading} variant='h5'>Create a new account</Typography>
                <Box className={classes.form}>
                    <TextField style={{display: 'none'}}/>
                    <TextField variant='outlined' label="Full Name" name='name'  className={classes.input} onChange={(e) => handleChange(e)} />
                    <TextField variant='outlined' label="Email" name='email'  className={classes.input} onChange={(e) => handleChange(e)} />
                    <TextField variant='outlined' label="Password" name='password' type='password' className={classes.input} onChange={(e) => handleChange(e)} />
                    <Box style={{display: 'flex', position: 'relative', left: 19.5, alignItems: 'center'}}>
                        <TextField variant='outlined' label="Confirm Password" type='password' name='confirmPassword' className={classes.input} onChange={(e) => handleChange(e)} />
                        {user.confirmPassword && user.confirmPassword === user.password && <Box className={classes.check}><CheckCircle style={{color: '#32e0c2'}} /></Box>}
                    </Box>
                </Box>
                {!loadingSignup && <Button variant='contained' style={{background: (user.email && user.password && user.confirmPassword) ? '#36e0c2':'#eee'}} className={classes.submit} disabled={!user.email || !user.password || !user.confirmPassword} onClick={() => handleSignUp()} >Sign up</Button>}
                {loadingSignup && <Button variant='contained'className={classes.submit} ><CircularProgress size={22} color='#fff' /></Button>}

                <Box className={classes.actions}>
                <Link to='/signin' className={classes.link}><Typography>Back to Sign in!</Typography></Link>
                </Box>
            </Box>
        </Box>
}

export default Signup