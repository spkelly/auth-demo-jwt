var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var knex = require('../knex');
var tokenMiddleware = require('../middleware/token');
var errorMessages = require('../helpers/error').messages;
var isUserValid = require('../helpers/userHelpers').isUserValid;

router.post('/login', (req, res, next)=>{

  // TODO: too many nested ifs
  // TODO: Remove time out

  // Timeout here is meant to introduce a fake lag to test the
  // loading spinners on the front end
  
  setTimeout(()=>{
    const email = req.body.username;
    const password = req.body.password;
    if(!email|| !password){
      next(errorMessages.auth.PASSWORD_ERROR);
    }
    knex('users').where({email})
    .select(['user_id', 'hash'])
    .then((data)=>{
      if(data.length > 0){
        bcrypt.compare(password, data[0].hash)
        .then((isValid)=>{
          if(isValid){
            const token = jwt.sign({
              user_id: data[0].user_id,
              expiresIn: '7d'
            },
              process.env.JWT_SECRET, {}
            );
            res.json({_token:token});
          }
          else{
            next(errorMessages.auth.PASSWORD_ERROR);
          }
        });
      }
      else{
        next(errorMessages.auth.PASSWORD_ERROR);
      }
    })
    .catch((err)=>{
      res.json({err:'an error hass occured'});
    });
  }, 1000);
});

router.post('/signup',async (req, res, next)=>{
  let userData = req.body;
  if(isUserValid(userData)){
    let hash = await bcrypt.hash(userData.password,10)
    .catch((err)=>{
      res.send('an error has occured');
    });
    if(hash){
      knex('users',)
      .returning('user_id')
      .insert({
        'email': userData.email,
        'hash': hash,
        'image_url': userData.imageUrl,
        'display_name': userData.displayName
      })
      .then((data)=>{
        console.log(data);
        res.locals.tokenInfo = {
          userId:data[0]
        }
        next();
      })
      .catch(err=>{
        next(err);
      })
    }
  }

  // res.send('hello');
}, tokenMiddleware.signAndSendToken);




router.get('/logout', (req, res, next)=>{
  res.send('logout endpoint');
});


router.get('/profile', tokenMiddleware.verifyJWT, (req, res, next)=>{
  let profile = res.locals.tokenInfo;
  
  if(!profile.user_id){
    next('there was a problem accessing your profile');
  }
  knex('users')
  .select(['display_name', 'image_url'])
  .then((data)=>{
    res.json(data[0]);
  })
  .catch(err=>{
    // TODO: More error handling here
    next(errorMessages.profile.PROFILE_ERROR);
  })
});


router.get('/', (req, res, next)=>{
  res.send('get all users endpoint');
});


module.exports = router;