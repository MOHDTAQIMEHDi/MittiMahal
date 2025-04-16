const jwt = require('jsonwebtoken'); // import jsonwebtoken
require('dotenv').config(); // import dotenv

const verifyToken = (req, res, next) => {  // create a function to verify token
    const token = req.header['x-auth-token']; // get token from header
    if (!token) {
     res.status(403).json({message: 'token not provided'}); // if token is not found return token denied
    }
    else{
        jwt.verify(  // verify token
            token, // token to verify
            process.env.JWT_SECRET,  // secret key
            (err,payLoad)=>{  
                if(err){
                    console.log(err);
                    res.status(500).json(err);
                }else{
                    req.user = payLoad; // if token is verified then set user to payLoad
                    next(); // if token is verified then call next
                 }
            }
        )
    }
} 
module.exports = verifyToken; // export verifyToken