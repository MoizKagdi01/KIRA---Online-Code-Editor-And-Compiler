import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useState } from "react";

export default function MuiLogin() {
  const [checkrem,setCheckRem] = useState(false)

  const nav = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(document.getElementById("login"));
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((result) => {
        const errEmail = document.getElementById("loginEmail")
        const errPass = document.getElementById("loginPass")
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
            Cookies.set("username",result[0].username,{expires:30});
            
          } else {
            Cookies.set("user", data.email);
            Cookies.set("username",result[0].username);
            
          }
          nav("/home");

        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Container component="main" maxWidth="xs" sx={{width:"60vw",height: "60vh",backgroundColor:"#8884",borderRadius:"30px", boxShadow:"0px 0px 15px white" }}>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          LOG IN
        </Typography>
        <Box component="form" onSubmit={handleLogin} id="login" noValidate sx={{ mt: 3, width:"30vw" }}>
          <TextField
            margin="normal"
            sx={{color:"black"}}
            required
            fullWidth
            color="secondary"
            id="email"
            label="Email Address"
            name="email"
          />
          <Typography className="text-red-500" id="loginEmail"></Typography>
          <TextField
          style={{color:"#000"}}
            margin="normal"
            required
            color="secondary"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Typography className="text-red-500" id="loginPass"></Typography>
          <FormControlLabel
          style={{color:"#000"}}
            control={<Checkbox onChange={(event)=>{setCheckRem(!checkrem)}} checked={checkrem} value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            color="success"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <RLink to="/signin">
                <Link href="#" className="text-red-500"  variant="h6">
                  "Don't have an account? Sign Up"
                </Link>
              </RLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}