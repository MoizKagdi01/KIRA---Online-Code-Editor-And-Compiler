const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');
router.post('/updatecontent', (req, res) => {
    const usersFolder = path.join('./users');
    const userProject = path.join(usersFolder, req.body.email);
    const projectName = path.join(userProject, req.body.prname);
    const file=req.body.file
    const content = req.body.content
    const fullPath = path.join(projectName,file)
    fs.exists(fullPath, (exists) => {
        if (!exists) {
            return res.status(404).json({ error: 'File not found' });
        }
        fs.writeFile(fullPath,content,(err)=>{
            if (err) {
                return res.status(404).send({"error":err})
            } 
            else {
                res.send({
                    done:"updated"
                });
            }
        })
    });
    
});
module.exports=router;
