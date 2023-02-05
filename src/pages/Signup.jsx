import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Grid, TextField, Button, Typography,
    CssBaseline, Container, Box, Avatar,
    InputAdornment
} from '@mui/material'
// region -----------Icons-------------------

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // for visibility on
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'; //for visibility off

//endregion



const SignupPage = ()=> {

    const [user, setUser] = useState({firstName: '',lastName: '',email: '', password: ''});

    const [showPassword, setShowPassword] = useState({password: false, confirmPassword: false})
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate()
    const linkStyle = {textDecoration: "none"};
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({...user, [name]: value}))
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, user)
        .then((response) => {
            navigate('/login');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
        
    }
    return (
       
        <Container maxWidth="xs">
            <CssBaseline />
           
            <Box  
                sx={{
                    mt: 8, display: 'flex', mb: 6,
                    flexDirection: 'column', alignItems: 'center'
                }}
            >
                  <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
                    <LockOutlinedIcon  />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                { errorMessage && <p className="error-message">{errorMessage}</p> }
                <Grid container spacing={2} sx={{mt: 3}}>
                    <Grid item xs={12}>
                        <TextField
                        placeholder='Enter Your First Name'
                        label='First Name' name='firstName' value={user.firstName}
                        onChange={handleChange}
                            
                          />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        placeholder='Enter Your Last Name'
                        label='Last Name' name='lastName' value={user.lastName} 
                        onChange={handleChange}
                          />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        placeholder='Enter Your Email'
                        label='Email' name='email' value={user.email} 
                        onChange={handleChange}
                          />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        placeholder='Enter Your Password'
                            label='Password' name='password' value={user.password} 
                            type={showPassword.password ? 'text' : 'password'}
                            onChange={handleChange}
                            InputProps={{
                              endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}>
                                  {!showPassword.password ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                              </InputAdornment>,
                          }}
                          />
                    </Grid>
                    
                </Grid>
                <Button fullWidth sx={{mt: 3, mb: 2 }} onClick={handleSubmit}>Sign Up</Button>
               
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login" style={linkStyle}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            
            
        </Container>
    )
}

export default SignupPage