const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const conn = require('../db');

function isArrayEmpty(arr) {
  return Array.isArray(arr) && arr.length === 0;
}

router.post('/login',[
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({min: 4}).withMessage('Password must be at least 4')
],(req, res) => {  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {

        console.error({ 
          status:"error",
          errors: errors.array() 
        })

        return res.status(200).json({ 
          status:"error",
          errors: errors.array() 
        });
      }
  
  const data = [req.body.email,req.body.password]
  conn.query(`select email,username from login where email=? AND password=?;`,data,(err,result)=>{
    if (err) {
      console.error('Error:', err);
      res.send({status:"error"})
    } else {
      if (isArrayEmpty(result)) {
        
        return res.status(200).json({ 
          status:"error",
          errors: [
            {
              type: 'field',
              value: 'ASX',
              msg: 'Invalid Credentials',
              path: 'password',
              location: 'body'
            }]
        });
      } else {
        res.send(result)
      }
    }
  })

  })
module.exports=router;