const express = require('express')
const path = require('path')
const home = require("./routes/home")
const signup = require("./routes/signup")
const login = require("./routes/login")
const run = require("./routes/run")
const folder = require("./routes/folder")
const sendfile = require("./routes/sendfile")
const sendhtml = require("./routes/sendhtml")
const sendcss = require("./routes/sendcss")
const sendscript = require("./routes/sendscript")
const updatecontent = require("./routes/updatecontent")
const projects = require("./routes/projects")
const createproject = require("./routes/createProject")
const deletepr = require("./routes/deletepr")
const cors = require('cors')
const app = express()
const port = 5000
app.use(express.json())
app.use(express.static(path.join("./users"), {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');  
    }
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');  
    }
  }
}))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));



app.use(home)
app.use(signup)
app.use(folder)
app.use(run)
app.use(login)
app.use(projects)
app.use(sendfile)
app.use(sendhtml)
app.use(sendcss)
app.use(sendscript)
app.use(createproject)
app.use(deletepr)
app.use(updatecontent)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})