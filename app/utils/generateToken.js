const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  console.log(id);

  if(id){
    return jwt.sign({_id:id}, process.env.JWT_SECRET, {
      expiresIn: '60d',
    });
  }
 
};

module.exports = generateToken;
