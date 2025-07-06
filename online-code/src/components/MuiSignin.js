
import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Box, Link } from '@mui/material';
import { Link as RLink, useNavigate } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Cookies from 'js-cookie';
const MuiSignin = () => {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [checkrem, setCheckRem] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignin = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("signup"));
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((result) => {
        const errEmail = document.getElementById("signinEmail")
        const errPass = document.getElementById("signinPass")
        errEmail.innerText = ""
        errPass.innerText = ""
        if (result.status === "error") {
          result.errors.map((error) => {
            if (error.path === "email") {
              errEmail.innerText = error.msg
            }
            if (error.path === "password") {
              errPass.innerText = error.msg
            }
            return null
          })


        }
        else {
          if (checkrem) {
            Cookies.set("user", data.email,{expires:30});
            Cookies.set("username",data.username,{expires:30});
          } 
          else {
            Cookies.set("user", data.email);
            Cookies.set("username",data.username);
          }
          Cookies.set("user", data.email);
          Cookies.set("username", data.username);
          nav("/home");

        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
      <Container maxWidth="xs" sx={{height:"60vh",width:"50vw",backgroundColor:"#9994",borderRadius:"30px", boxShadow:"0px 0px 15px white" }} id="signinpage">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
          <Typography component="h1" variant="h5">Sign Up</Typography>
          <Box component="form" id='signup' noValidate onSubmit={handleSignin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              sx={{ background: "transparent" }}
              required
              fullWidth
              id="username"
              color="secondary"
              label="Name"
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              color="secondary"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography className="text-red-500" id="signinPass"></Typography>
            <TextField
              margin="normal"
              required
              type="email"
              fullWidth
              color="secondary"
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography className="text-red-500" id="signinEmail"></Typography>
            <FormControlLabel
            style={{color:"#000"}}
              control={<Checkbox onChange={(event)=>{setCheckRem(!checkrem)}} checked={checkrem} value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Grid container paddingTop={"20px"}>
          <Grid item>
            <RLink to="/login">
              <Link href="/" className='text-red-600'  variant="h6">
                have an account? Log In
              </Link>
            </RLink>
          </Grid>
        </Grid>
      </Container>
  )
}
export default MuiSignin