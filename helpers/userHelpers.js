function isUserValid(user){
  console.log('user Validity check.');

  if(user.email && user.password && user.displayName && user.imageUrl){
    return true;
  }
  return false;
}



module.exports = {
  isUserValid
};