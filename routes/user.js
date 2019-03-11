var express = require('express');
var router = express.Router();


router.post("/login", (req,res,next)=>{
  let username = req.body.username;
  let password = req.body.password;
  
  if(username.length < 0 || password.length < 0){
    let errorMessage = 'Username or Password is invalid';
    next(errorMessage);
  }

  // Verify user from database
  // if verification passes send 200 and Jwt token Header 
  // if verification fails send 400 error
  res.send('login endpoint');
});



router.get("/logout", (req,res,next)=>{
  res.send('logout endpoint');
});

// TODO: Write JWT token middleware to access protected endpoints
router.get("/profile", (req,res,next)=>{
  res.send('profile endpoint');
});


router.get("/", (req,res,next)=>{
  res.send('get all users endpoint');
});


module.exports = router;