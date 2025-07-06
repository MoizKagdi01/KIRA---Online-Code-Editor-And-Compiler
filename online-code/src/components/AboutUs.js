import React from 'react';
import { Container, Grid, Typography, Box, Button, Paper } from '@mui/material';
import logo from "./logo2.png";
import { Link } from 'react-router-dom';
const AboutUs = () => {
  return (
    <>
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2"  color="primary.light" style={{textShadow:"0 0 5px black"}} gutterBottom>
            KIRA 
          <Typography variant="h4" color="primary.light" style={{textShadow:"0 0 5px black"}} gutterBottom>
            (Knowledge Integrated Runtime Application)
            </Typography>
          </Typography>
          <Typography variant="h4"  color="primary.light" style={{textShadow:"0 0 5px black"}}>
            Let's Code!
          </Typography>
        </Box>

        {/* What is KIRA? Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={7}>
            <Paper elevation={3} sx={{ p: 3 }} style={{boxShadow:"0 0 10px #888"}}>
              <Typography variant="h5" color="primary" gutterBottom>
                What is KIRA?
              </Typography>
              <Typography variant="body1" color="textSecondary">
                KIRA is an online code editor and compiler designed to provide developers and learners with a seamless
                and interactive environment to write, test, and debug code in multiple programming languages. Our goal is
                to foster a knowledge-sharing platform that integrates runtime applications with an intuitive editor for
                fast and efficient coding experiences.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <img
              src={logo} 
              alt="KIRA Code Editor"
              className='aboutlogo'
              style={{ width: '100%',height:"100%", borderRadius: 8 , backgroundColor:"#000",boxShadow:"0 0 20px #888"}}
            />
          </Grid>
        </Grid>

        {/* Why Choose KIRA Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12}>
            <Typography variant="h5"  color="primary.light" style={{textShadow:"0 0 5px black"}} gutterBottom>
              Why Choose KIRA?
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={20} sx={{ p: 3, textAlign: 'center' ,border:"1px solid #00000050"  ,boxShadow:"0 0 10px #888"}}>
              <Typography variant="h6" color="primary" gutterBottom>
                Multi-Language Support
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Code in any of the supported languages such as Python, Java, C++, JavaScript, and many more.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={20} sx={{ p: 3, textAlign: 'center' ,border:"1px solid #00000050" ,boxShadow:"0 0 10px #888" }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Real-Time Collaboration
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Collaborate in real-time with teammates, solve coding challenges, and work on projects together.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={20} sx={{ p: 3, textAlign: 'center' ,border:"1px solid #00000050" ,boxShadow:"0 0 10px #888"}}>
              <Typography variant="h6" color="primary" gutterBottom>
                Instant Execution & Debugging
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Instantly run and debug your code with our integrated runtime environment, ensuring quick feedback.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Our Vision Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h5" color="primary.light" style={{textShadow:"0 0 5px black"}} gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto' }}>
            At KIRA, we believe that coding should be accessible to everyone. Our vision is to empower developers,
            students, and educators by providing a powerful online platform where they can write, test, and learn to code
            seamlessly. We aim to become the go-to destination for anyone looking to enhance their coding skills and
            build amazing projects in a collaborative and supportive environment.
          </Typography>
        </Box>

        {/* Team Section
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h5" color="primary.light" style={{textShadow:"0 0 5px black"}} gutterBottom>
            Meet the Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Avatar alt="Moiz" src={myImg} sx={{ width: 150, height: 150, mx: 'auto',boxShadow:"0 0 20px #888"}} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Moiz Kagdi
              </Typography>
              <Typography variant="body2"  >
                CEO, Founder & developer
              </Typography>
              <Box sx={{ mt: 1 }}>
                <IconButton className='zoom' href="https://github.com/" target="_blank">
                  <GitHub color='' />
                </IconButton>
                <IconButton className='zoom' color='primary' href="https://www.linkedin.com/in/" target="_blank">
                  <LinkedIn />
                </IconButton>
                <IconButton className='zoom' color='primary' href="https://twitter.com/" target="_blank">
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box> */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Ready to Start Coding?
          </Typography>
          <Button variant="contained" color="primary" >
            <Link to='/signin'>
            Start Coding Now
            </Link>
          </Button>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default AboutUs;
