import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MuiNavbar from "./components/MuiNavbar";
import MuiLogin from "./components/MuiLogin";
import MuiSignin from "./components/MuiSignin";
import { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import {UserProvider} from "./context/User/UserContext";
import Footer from "./components/Footer";
const App = () => {
  if (process.env.NODE_ENV === 'development') {
    window.ResizeObserver = window.ResizeObserver || function () {
      return { disconnect: () => {} };
    };
  }
  const theme = createTheme({
    palette: {
      mode: "light",
      text:{
        textSecondary:"#fff"
      }
    }
  })
  const [darkMode , setDarkMode] = useState(true)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <Router>
      <UserProvider>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiNavbar toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/signin" element={<MuiSignin />} />
        <Route path="/login" element={<MuiLogin />} />
        <Route path="/main" element={<Main theme={darkMode} />} />
        <Route path="/" element={<AboutUs />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
      </ThemeProvider>
      </UserProvider>
    </Router>
  );
};
export default App;
