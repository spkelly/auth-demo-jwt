let jwt = require("jsonwebtoken");



function verifyJWT(req,res,next){
  let token = req.headers.authorization;


  jwt.verify(token, process.env.SECRET, (err, decodedJWT)=>{
    if(err){
      let error = "there was a problem with verifying your token"
      next(error);
    }
    else{
      res.local.tokenInfo = decodedJWT;
      next();
    }
  })
}


module.exports = {
  verifyJWT
}