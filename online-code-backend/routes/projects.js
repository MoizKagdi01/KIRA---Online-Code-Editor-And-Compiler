const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');

// Route to get the list of directories in the 'users' folder
router.post('/projects', (req, res) => {
    const usersFolder = path.join('./users');
    const userProject = path.join(usersFolder, req.body.email);
    projectObjectArr = fs.readdirSync(userProject,{withFileTypes:true})
    const projects = projectObjectArr.map((projectObject)=>{
        const project= projectObject.name.split(',')
        return {
            lang:project[0],
            name:project[1]
        }
    })
    res.send(projects)
});
module.exports=router;
