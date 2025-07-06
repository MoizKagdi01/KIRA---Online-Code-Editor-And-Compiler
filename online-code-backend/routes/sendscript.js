const express = require('express')
const router = express.Router()
router.get('/scripts.js', (req, res) => {
  res.sendFile("D:\\web projects\\MERN\\KIRA - Online Code Editor And Compiler\\online-code-backend\\"+req.get("referer").split("=")[1].replace("index.html","scripts.js")); 
});
module.exports=router;