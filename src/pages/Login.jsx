import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Grid, TextField, Button, Typography,
    CssBaseline, Container, Box, Avatar,
    InputAdornment
} from '@mui/material'

// #region --------------( ICONS )--------------
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion


 function LoginPage() {
    const [user, setUser] = useState({email: '', password: ''});
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    
    const linkStyle = {textDecoration: "none"};
     const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({...user, [name]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user)
            .then((response) =>{
                // store the token in localStorage
                storeToken(response.data.authToken)
                authenticateUser()
                navigate("/newblog")
            } )
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
              })
              .finally(() => {
                setLoading(false)
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
                    Login
                </Typography>
                { errorMessage && <p className="error-message">{errorMessage}</p> }
                <Grid container spacing={2} sx={{mt: 3}}>
  
                    <Grid item xs={12}>
                        <TextField
                            placeholder='Enter Your Email' name='email' 
                            label='Email' value={user.email} 
                            onChange={handleChange} 
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            placeholder='Enter Password' name='password' 
                            label='Password' value={user.password} 
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChange} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </InputAdornment>,
                            }}
                        />
                    </Grid>                      
                </Grid>
                <Button 
                    onClick={handleSubmit}
                    fullWidth sx={{
                        mt: 3, mb: 2
                    }}
                >
                    Login
                </Button>
              
                <Grid container justifyContent="flex-center">
                    <Grid item>
                        <Link to="/signup" style={linkStyle}>
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            
        </Container>
    )
}

export default LoginPage;
