var express = require('express');
var router = express.Router();


router.post("/login", (req,res,next)=>{
  res.send('login endpoint');
});
router.get("/logout", (req,res,next)=>{
  res.send('logout endpoint');
});
router.get("/profile", (req,res,next)=>{
  res.send('profile endpoint');
});
router.get("/", (req,res,next)=>{
  res.send('get all users endpoint');
});


module.exports = router;