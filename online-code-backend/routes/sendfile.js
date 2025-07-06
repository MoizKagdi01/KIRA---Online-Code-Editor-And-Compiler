const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');
router.all('/sendfile', (req, res) => {
    const usersFolder = path.join('./users');
    const userProject = path.join(usersFolder, req.body.email);
    const projectName = path.join(userProject, req.body.prname);
    const file=req.body.file
    const fullPath = path.join(projectName,file)
    fs.exists(fullPath, (exists) => {
        if (!exists) {
            return res.status(404).json({ error: 'File not found' });
        }
    // Read the file content
        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Error reading file' });
        }
      // Send the file content in the response
        res.send({
        fileContent: data
        });
        });
    });
    
});
module.exports=router;








// const filePath = req.body.filePath;

// // Check if filePath is provided
// if (!filePath) {
//   return res.status(400).json({ error: 'File path is required' });
// }

// // Resolve the full path to prevent directory traversal vulnerabilities
// const fullFilePath = path.resolve(filePath);

// // Check if the file exists
// fs.exists(fullFilePath, (exists) => {
//   if (!exists) {
//     return res.status(404).json({ error: 'File not found' });
//   }

//   // Read the file content
//   fs.readFile(fullFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error reading file' });
//     }

//     // Send the file content in the response
//     res.status(200).json({
//       fileContent: data
//     });
//   });
// });