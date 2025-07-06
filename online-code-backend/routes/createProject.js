const fs = require('fs');
const path = require('path');
const express = require('express')
const router = express.Router()
const extraFs = require("fs-extra")
router.post('/createpr', (req, res) => {
    const usersFolder = path.join('./users');
    const userProject = path.join(usersFolder, req.body.email);
    const projectName = path.join(userProject, req.body.prname);
    fs.mkdirSync(projectName,{withFileTypes:true})
    const lang= req.body.prname.split(',')
    try {
        
        switch (lang[0]) {
            case "java":
                extraFs.copy("./boilerplate/java",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
        
            case "c":
                extraFs.copy("./boilerplate/c",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
        
            case "cpp":
                extraFs.copy("./boilerplate/cpp",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
        
            case "python":
                extraFs.copy("./boilerplate/python",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
        
            case "html":
                extraFs.copy("./boilerplate/html",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
            case "css":
                extraFs.copy("./boilerplate/html",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
            case "javascript":
                extraFs.copy("./boilerplate/html",projectName).then(()=>{}).catch((err)=>{res.send({error:"Project alredy exist"})})
                break;
        
            default:
                break;
        }
        projectObjectArr = fs.readdirSync(userProject,{withFileTypes:true})
        const projects = projectObjectArr.map((projectObject)=>{
            const project= projectObject.name.split(',')
            return {
                lang:project[0],
                name:project[1]
            }
        })    
        res.send(projects)
    } catch (error) {
        res.send({error:"Project alredy exist"})
    }
});
module.exports=router;