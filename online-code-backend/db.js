const mysql = require("mysql")
const conn  = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"kira"
})
conn.connect((err)=>{
if (err) {
  console.log(err)
} else {
  console.log("connected to db")
}
})

module.exports = conn