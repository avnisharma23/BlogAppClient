import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SignupIcon from '@mui/icons-material/HowToReg';


import { Link, useNavigate } from "react-router-dom";
import {useContext} from 'react';
import {AuthContext} from '../context/auth.context';

export default function NavBar() {
    
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const linkStyle = {textDecoration: "none"};
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoutClick = () => {
    navigate('/')
    setAnchorElUser(null);
  };
  const handleLogInClick = () => {
    navigate('/login')
    
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/signup')
    
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
       
          <Typography>
            Blog Application
          </Typography>
          
          <MenuItem>
             <Link to="/signup" style={linkStyle}>
               <Button variant="outlined" sx={{ border: '1px solid #black'}}><SignupIcon sx={{ mr: 2 }}/>Sign Up</Button>
             </Link>
          </MenuItem>
          <Link to="/login" style={linkStyle}>
                <Button variant="outlined" sx={{ my: 2, border: '1px solid #black'}}><LoginIcon sx={{ mr: 2 }}/>Login</Button>
          </Link>
           
              <MenuItem onClick={handleLogoutClick}>
              <Link to="/" style={linkStyle}>
                <Button variant="outlined" sx={{ my: 2, border: '1px solid #black'}}><LogoutIcon sx={{ mr: 2 }} onClick={logOutUser}/>LogOut</Button>
              </Link>
              </MenuItem>
             
          
                
       
        </Toolbar>
      </AppBar>
    </Box>
  );
}