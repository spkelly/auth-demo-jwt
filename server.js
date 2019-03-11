require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var userRoutes = require("./routes/user");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'pug');
app.set('x-powered-by', false);
app.set('views', path.resolve(__dirname,"views"));
app.use(bodyParser.urlencoded({extended:false}));
app.use("/users",userRoutes);
app.use(errorHandler);

app.get('*', (req,res,next)=>{
  res.sendStatus(200);
})

function errorHandler(err, req,res,next){
  res.send(`Error: ${err}`);
}


app.listen(port);