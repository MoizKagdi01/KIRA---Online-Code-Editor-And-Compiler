
const express = require('express')
const router = express.Router()
router.get('/sendhtml', (req, res) => {   
    
  res.sendFile("D:\\web projects\\MERN\\KIRA - Online Code Editor And Compiler\\online-code-backend\\"+req.query.fileaddr); 

});
  module.exports=router;