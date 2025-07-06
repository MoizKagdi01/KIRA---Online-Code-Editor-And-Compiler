const express = require('express')
const router = express.Router()
const path = require('path');
const extraFs = require("fs-extra")

router.post('/folder', (req, res) => {
    const usersFolder = path.join("./users");
    const userProject = path.join(usersFolder, req.body.email);
    const projectName = path.join(userProject, req.body.prname);
    extraFs.readdir(projectName,{withFileTypes:true}).then((projectObjectArr)=>{
        const result = projectObjectArr.map((projectObject)=>{
            return (
                {
                    "lang":projectObject.name.split(".")[1],
                    "name":projectObject.name.split(".")[0]
                }
            )
        })
        res.send(result)
    }).catch((err)=>{
        res.status(500).send({status:"error",error:err})
    })
});
module.exports=router;