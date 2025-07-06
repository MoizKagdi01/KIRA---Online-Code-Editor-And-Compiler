import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from "@mui/icons-material/Person"
import logo from '../ImageUtilities/logo2.png'
import { deepPurple } from '@mui/material/colors';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const settings = ['Logout'];

function MuiNavbar({ toggleDarkMode }) {
  const [navdisplay,setnavdisplay] = React.useState("block")
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const loc = useLocation()
  React.useEffect(()=>{
    if (loc.pathname === "/signin" ||  loc.pathname === "/login" ) {
      setnavdisplay("none")
    } else {
      setnavdisplay("block")
      
    }
  })
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const nav = useNavigate();
  function handleLogout() {
    Cookies.remove("user")
    Cookies.remove("lang")
    Cookies.remove("name")
    Cookies.remove("username")
    nav("login")
  }

  return (
    <AppBar position="sticky" style={{display:"block"}} sx={{ backgroundColor: deepPurple[500], height: "9vh" }}>
      <Container maxWidth="xl" style={{position:"relative"}}>
        <Toolbar disableGutters>
          {/* <Typography
            className='mr-5 hover:text-white'
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/"><div className='container'><img src={logo} className='main-logo' alt='logo' /></div></Link>
          </Typography> */}
           <Link to={"/"}>
          <Typography
            variant="h5"
            noWrap
            className='hover:text-white'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          <img src={logo} className='main-logo' alt='logo' />
          </Typography></Link>
          <Box sx={{ flexGrow: 0,marginLeft:"80vw",display:navdisplay}} md={{ flexGrow: 0,marginLeft:"40vw",display:navdisplay}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  >
                  <PersonIcon htmlColor='white' />
                </Avatar>
              </IconButton >
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                <MenuItem key="urs">
                    <Typography textAlign="center">
                      welcome, {Cookies.get("username")}
                      </Typography>
                  </MenuItem>
              }
              {settings.map((setting,index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Button onClick={handleLogout} sx={{width:"10vw"}} className='hover:bg-blue-600 hover:text-white' variant='text'>{setting}</Button>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem key="theme" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Button onClick={toggleDarkMode} sx={{width:"10vw"}} className='hover:bg-blue-600 hover:text-white' variant='text'>Switch Theme</Button>
                  </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Button sx={{width:"10vw"}} className='hover:bg-blue-600 hover:text-white' variant='text'><Link to="/home">Home</Link></Button>
                  </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MuiNavbar;
