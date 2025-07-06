import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Box, Link } from '@mui/material';
import { Link as RLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Signin = () => {
  const nav = useNavigate();
  const [name, setName] = useState('');
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
        const errEmail = document.getElementById("signinEmail");
        const errPass = document.getElementById("signinPass");
        errEmail.innerText = "";
        errPass.innerText = "";
        if (result.status === "error") {
          result.errors.map((error) => {
            if (error.path === "email") {
              errEmail.innerText = error.msg;
            }
            if (error.path === "password") {
              errPass.innerText = error.msg;
            }
            return null;
          });
        } else {
          Cookies.set("user", data.email);
          nav("/home");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ height: "100vh" }} className="bg-gray-900 flex justify-center items-center">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', width: '100%' }}>
        <Typography component="h1" variant="h5" className="text-3xl font-bold text-green-400 mb-6">Sign Up</Typography>
        
        <Box component="form" id="signup" noValidate onSubmit={handleSignin} sx={{ width: '100%' }} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Name"
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 text-white"
            InputLabelProps={{ className: "text-gray-400" }}
            InputProps={{
              className: 'bg-gray-700 text-white',
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white"
            InputLabelProps={{ className: "text-gray-400" }}
            InputProps={{
              className: 'bg-gray-700 text-white',
            }}
          />
          <Typography className="text-red-500 text-sm" id="signinPass"></Typography>

          <TextField
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 text-white"
            InputLabelProps={{ className: "text-gray-400" }}
            InputProps={{
              className: 'bg-gray-700 text-white',
            }}
          />
          <Typography className="text-red-500 text-sm" id="signinEmail"></Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="bg-green-500 hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </Button>
        </Box>

        <Grid container paddingTop={"20px"}>
          <Grid item>
            <RLink to="/login">
              <Link href="/" variant="body2" className="text-gray-400 hover:text-green-400 transition duration-300">
                Have an account? Log In
              </Link>
            </RLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signin;
