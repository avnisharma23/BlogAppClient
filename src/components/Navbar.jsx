import * as React from 'react';
import AppBar from '@mui/material/AppBar';

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
    
  
  const [ setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const {isLoggedIn,logOutUser} = useContext(AuthContext);
  const linkStyle = {textDecoration: "none"};
   
  const handleLogoutClick = () => {
    navigate('/')
    setAnchorElUser(null);
  };
  
 
  return (
  
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
       
          <Typography>
            Blog Application
          </Typography>
          
          {!isLoggedIn && (
          <>
          
            <MenuItem>
              <Link to="/signup" style={linkStyle}>
                <Button variant="outlined" sx={{ border: '1px solid #black'}}><SignupIcon sx={{ mr: 2 }}/>Sign Up</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/login" style={linkStyle}>
                    <Button variant="outlined" sx={{  border: '1px solid #black'}}><LoginIcon sx={{ mr: 2 }}/>Login</Button>
              </Link>
            </MenuItem>
           
            </>
          )}
        {isLoggedIn && (
          <>
            <MenuItem onClick={handleLogoutClick}>
                <Link to="/" style={linkStyle}>
                  <Button variant="outlined" sx={{ my: 2, border: '1px solid #black'}}><LogoutIcon sx={{ mr: 2 }} onClick={logOutUser}/>LogOut</Button>
                </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/bloglist" style={linkStyle}>
                    <Button variant="outlined" sx={{ my: 2, border: '1px solid #black'}}>My Blogs</Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/newblog" style={linkStyle}>
                    <Button variant="outlined" sx={{ my: 2, border: '1px solid #black'}}>Create Blog</Button>
              </Link>
            </MenuItem>
          
          </>
          
        )}
        </Toolbar>

      </AppBar>
      </React.Fragment>
  );
}