const express = require('express')
const router = express.Router()
router.get('/styles.css', (req, res) => {
    res.sendFile("D:\\web projects\\MERN\\KIRA - Online Code Editor And Compiler\\online-code-backend\\"+req.get("referer").split("=")[1].replace("index.html","styles.css")); 
  });
  module.exports=router;