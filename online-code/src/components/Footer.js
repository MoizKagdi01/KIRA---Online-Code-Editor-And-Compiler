import React from 'react';
import { Container, Grid, Typography, Box, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const loc = useLocation()
  const [footdisplay,setfootdisplay] = useState("block")
  React.useEffect(()=>{
    if (loc.pathname === "/signin" ||  loc.pathname === "/login" ||  loc.pathname === "/main" ) {
      setfootdisplay("none")
    } else {
      setfootdisplay("block")
    }
  })
  return (
    <Box style={{display:footdisplay}} sx={{ backgroundColor: '#212121', color: 'white', py: 1}}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2">
              Vadodara, Gujrat, India
            </Typography>
            <Typography variant="body2">
              Phone: (91) 8849725763
            </Typography>
            <Typography variant="body2">
              Email: moizkagdi03@gmail.com
            </Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" justifyContent="space-around" sx={{ mt: 1 }}>
              <IconButton color="primary" className='zoom' href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="secondary"  className='zoom' href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="primary"  className='zoom' href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="primary"  className='zoom' href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Section */}
        <Box sx={{ textAlign: 'center', mt: 2, borderTop: '1px solid #424242', pt: 2 }}>
          <Typography variant="body2">
            &copy; 2025 KIRA. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
