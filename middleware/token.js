const jwt = require('jsonwebtoken');



function verifyJWT(req, res, next){
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if(!err){
      res.locals.tokenInfo = decoded;
      next();
    }
    else{
      const error = 'there was a problem with verifying your session';
      next(error);
    }
  });
}

async function signAndSendToken(req,res,next){
  let tokenInfo = res.locals.tokenInfo;


  console.log('made id', tokenInfo);
  if(!tokenInfo){
    console.log('no token info', tokenInfo);
    next('an error has occured');
  } 

  let token = jwt.sign(tokenInfo,
    process.env.JWT_SECRET,{},
    (err,encoded)=>{
      if(err){
        console.log(err);
        next('an error has occured');
      }
      res.json({
        token:encoded
      });
    })
}


module.exports = {
  verifyJWT,
  signAndSendToken
}