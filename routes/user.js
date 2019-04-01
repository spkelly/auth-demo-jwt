var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var knex = require('../knex');
var tokenMiddleware = require('../middleware/token');


router.post('/login', (req, res, next)=>{

  setTimeout(()=>{
    const email = req.body.username;
    const password = req.body.password;
    if(!email|| !password){
      const errorMessage = 'Username or Password is invalid';
      next(errorMessage);
    }
    knex('users').where({email})
    .select(['user_id', 'hash'])
    .then((data)=>{
      if(data.length > 0){
        bcrypt.compare(password, data[0].hash)
        .then((isValid)=>{
          if(isValid){
            const token = jwt.sign({
              user_id: data[0].user_id},
              process.env.JWT_SECRET, {}
            );
            res.json({_token:token});
          }
          else{
            const errorMessage = 'Username or Password is invalid';
            next(errorMessage);
          }
        });
      }
      else{
        const errorMessage = 'Username or Password is invalid';
        next(errorMessage);
      }
    })
    .catch((err)=>{
      res.json({err:'an error hass occured'});
    });
    // Verify user from database
    // if verification passes send 200 and Jwt token Header
    // if verification fails send 400 error
  }, 1000);
});



router.get('/logout', (req, res, next)=>{
  res.send('logout endpoint');
});


router.get('/profile', tokenMiddleware.verifyJWT, (req, res, next)=>{
  let profile = res.locals.tokenInfo;
  
  if(!profile.user_id){
    next('there was a problem accessing your profile');
  }
  knex('users').select(['display_name', 'image_url']).then((data)=>{
    res.json(data);
  })
  .catch(err=>{
    console.log(err);
  })
});


router.get('/', (req, res, next)=>{
  res.send('get all users endpoint');
});


module.exports = router;