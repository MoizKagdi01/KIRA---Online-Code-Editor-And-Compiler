import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import { Paper, Grid, Select, TextField, Typography, MenuItem, Container, } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Home = () => {
  const [projects, setprojects] = useState([])
  const [prName, setprName] = useState("")
  const [lang, setLang] = useState("")
  const nav = useNavigate();

  function fetchProject() {
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": Cookies.get("user") }),
    })
      .then(response => response.json())
      .then((result) => {
        setprojects(result)
      }
      )
  }

  useEffect(() => {
    if (! Cookies.get("user")) {
      nav("/login")
    } else {
    fetchProject()
  }
    // eslint-disable-next-line
  }, [])

  const [showProjectCreateForm, setshowProjectCreateForm] = useState("hidden")
  function toggleProjectCreateForm() {
    if (showProjectCreateForm === "hidden") {
      setshowProjectCreateForm("block")
    }
    if (showProjectCreateForm === "block") {
      setshowProjectCreateForm("hidden")
    }
  }

  function createproject(event) {
    event.preventDefault();
    if (prName === "" || lang === "" ) {
      if (prName === "") {
        const prerr = document.getElementById("prErr")
        prerr.style.display = "block"
      } 
      else {
        const prerr = document.getElementById("prErr")
        prerr.style.display = "none"

      }
      if (lang === "") {
        const prerr = document.getElementById("laErr")
        prerr.style.display = "block"
      } 
      else {
        const prerr = document.getElementById("laErr")
        prerr.style.display = "block"

      }
      
    } 
    else {
      
      const data = {
        email: Cookies.get("user"),
        prname: lang + "," + prName
      };
      fetch('http://localhost:5000/createpr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then((result) => {
          if (result.error) {
            alert(result.error)
          } else {
            setprojects(result)
            toggleProjectCreateForm()
          }
        })
        .catch(() => {
          alert("project alredy exist")
          toggleProjectCreateForm()
        })
    }
  }
  function handleDelete(event) {
    event.stopPropagation();
    const data = {
      email: Cookies.get("user"),
      prname: event.target.getAttribute("lang") + "," + event.target.getAttribute("project")
    }
    fetch('http://localhost:5000/deletepr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then((result) => {
      if (result.error) {
        alert(result.error)
      } else {
          alert("project deleted")
          fetchProject()
        }
      })
      .catch((error) => {
        alert("error in delete"+error)
      })
      event.stopPropagation();
  }
  function handlePrClick(event) {
    Cookies.set("lang", event.target.getAttribute("lang"))
    Cookies.set("name", event.target.getAttribute("project"))
    nav("/main")
  }
  function handlePrName(event) {
    setprName(event.target.value)
  }
  function handleLang(event) {
    setLang(event.target.value)
  }
  return (
    <Container sx={{ margin: "0", marginBottom: "12vh", minHeight: "78vh" }} >
      {/* project creating interface */}
      <Paper
        className={`${showProjectCreateForm}`}
        style={{
          position: "absolute",
          height: "50vh",
          width: "50vw",
          zIndex: 2,
          top: "20vh",
          left: "20vw",
          border: "1px solid black",
          borderRadius: "10px",
          marginBottom: "10vh"
        }}>
        <form className='p-3' id='crpr'>
          <Typography gutterBottom={false} >Enter project name : </Typography>
          <TextField
            margin="normal"
            className=''
            required
            value={prName}
            onChange={handlePrName}
            id="project-name"
            label="Enter project name"
            type="text"
            name="project-name"
          />
          <div id='prErr' style={{display:"none"}} className='text-red-600'>Project name is not valid</div>
          <Typography gutterBottom={false} >Enter project language : </Typography>
          <Select id='project-language-select' required value={lang} onChange={handleLang} label="Project Language" >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="html">web dev ( html,cs,js)</MenuItem>
          </Select>
          <div id='laErr' style={{display:"none"}} className='text-red-600'>Project Language is not valid</div>
          <Grid container style={{ width: "95%" }} className='my-5'>
            <Grid item xs>
              <Button variant='contained' onClick={createproject} className='mx-4' >Create</Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' onClick={toggleProjectCreateForm}>Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Typography className='m-2'> Want to create a project ? </Typography>
      <Button className='mx-2 text-white bg-indigo-700 hover:bg-violet-200 hover:text-black' variant='contained' onClick={toggleProjectCreateForm} > create project</Button>
      <Typography className='my-5 mx-2'> Your Projects :  </Typography>
      <Grid className='card-container' container width={"90vw"} marginLeft={4} spacing={1} >{
        (projects.length === 0 ? <><Typography style={{marginTop:"2vh"}} variant='h3'>Oops! you don't have any projects right now,</Typography>
        <Typography variant='h5'>Create some project to start programming  right away</Typography></>:<Typography></Typography>)
      }{
            projects.map((project, index) => {
              return (
                <Grid item key={index}  project={project.name} lang={project.lang} onClick={handlePrClick}>
                  <Paper className="cards aspect-video" id={project.lang} sx={{border:"1px solid black"}} project={project.name} lang={project.lang} style={{ padding: "20px", textAlign: "center", width: "25vw", height: "25vh", color: "white"}} >
                    <Button  project={project.name} key={index} lang={project.lang} style={{position:"absolute",color:"black",fontWeight:"bolder",background:"red",left:0,top:0}} onClick={handleDelete}>X</Button>
                    <Typography project={project.name} lang={project.lang}  variant='h5' className='font-bold prcontent'>Project Name : {project.name}</Typography>
                    <Typography project={project.name} lang={project.lang} variant='h5' className='font-bold prcontent' >Project Language : {project.lang}</Typography>
                  </Paper>
                </Grid>
              )
            })}
      </Grid>
    </Container>
  )
}

export default Home
