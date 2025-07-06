const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');
router.post('/deletepr', (req, res) => {
    const usersFolder = path.join('./users');
    const userProject = path.join(usersFolder, req.body.email);
    const projectName = path.join(userProject, req.body.prname);
    fs.readdir(projectName,{withFileTypes:true},(err,files)=>{
        if (err) {
            res.send(err)
        } else {
            files.forEach((file)=> {
                const filePath = path.join(projectName, file.name);
                fs.unlink(filePath,(err)=>{
                    if (err) {
                        res.send(err)
                    } else {
                        fs.rmdir(projectName,()=>{
                            res.send({out:"deleted"});
                    
                        });
                    }
                });
            })
            
        }
    });
});
module.exports=router;