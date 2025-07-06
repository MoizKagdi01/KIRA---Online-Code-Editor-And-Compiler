const express = require('express')
const router = express.Router()
const { validationResult , body } = require('express-validator');
const conn = require("../db")
const createFolder = require('../userCreate').default;

router.post('/signup',[
     body('username').isLength({ min: 1 }).withMessage('Name should be more than 1 letter'),
     body('password').isLength({min: 4}).withMessage('Password must be at least 4'),
     body('email').isEmail().withMessage('Invalid email format')
  ], (req, res) => {  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({ 
          status:"error",
          errors: errors.array() 
        });
      }
      if (!req.body.email.endsWith("com")) {
        return res.status(200).json({ 
          status:"error",
          errors: [{msg:"Invalid Email format",path:"email"}] 
        });
      }
    const data = req.body
    conn.query("INSERT INTO login SET ?",data,(err,result)=>{
    if (err) {
      return res.status(200).json({ 
        status:"error",
        errors: [
          {
            type: 'field',
            msg: 'Email ID alredy Exist',
            path: 'email',
            location: 'body'
          }]
      });
    } else {
        createFolder(req.body.email)
        res.send(result)
    }
  })
  })
module.exports=router;