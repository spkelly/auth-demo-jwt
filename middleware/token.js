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


module.exports = {
  verifyJWT
}