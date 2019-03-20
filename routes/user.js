var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', (req, res, next)=>{
  const username = req.body.username;
  const password = req.body.password;

  if(!username|| !password){
    const errorMessage = 'Username or Password is invalid';
    next(errorMessage);
  }
  const token = jwt.sign({username, password},
    process.env.JWT_SECRET,
    {});
  // Verify user from database
  // if verification passes send 200 and Jwt token Header
  // if verification fails send 400 error
  res.json({_token:token});
});



router.get('/logout', (req, res, next)=>{
  res.send('logout endpoint');
});

// TODO: Write JWT token middleware to access protected endpoints
router.get('/profile', (req, res, next)=>{
  res.send('profile endpoint');
});


router.get('/', (req, res, next)=>{
  res.send('get all users endpoint');
});


module.exports = router;