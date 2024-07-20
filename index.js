require("./config/config");
require("./model/db");
const compression = require('compression')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const { links } = require("express/lib/response");

var app = express()
app.use(compression())

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
// app.use(cors({ origin: ["https://ashugallery12.herokuapp.com"], 

// methods:["GET","POST","DELETE","PUT"],
// origin:true,
// credentials: true }))


app.use(require('./routes/index.route'));
app.use((err,req,res,next)=>{
    if(err.name === 'ValidationError'){
            var valError =[];
            Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
            res.status(422).send(valError)
    }
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/www"))
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','www','index.html'))
    })
}

app.listen(PORT,()=> console.log(`server started at port :${PORT}`))