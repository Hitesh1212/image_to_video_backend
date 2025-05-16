const jwt = require('jsonwebtoken');

const UserModel = require('../model/userModel');

const protect = async (req, res, next) => {
  try {
    let token;

    token = req.headers.authorization;
    // console.log(req.headers);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (Date.now() <= decoded.exp) {
        return res.status(401).json({ status: 'fail', message: 'Token Expired', data: {} });
        }
    req.user = await UserModel.findById(decoded._id).select('-password');
    // console.log(req.user);
        
        
        
    if (req.user) {
      next();
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'Not authorized, token failedss',
        data: {},
      });
    }
    }       
    catch (error) {
        console.log(error)
        res.status(401).json({
            status: 'fail',
            message: 'Not authorized, token failed',
            data: {},
        });
    }   

}

module.exports = {protect};