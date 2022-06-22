const jwt = require('jsonwebtoken');
const {config} =require('../config/config')

const generateToken = (id)=>{
    return jwt.sign(id,config.secretKey)    
}

const verifyToken = (req, res, next) =>{
    const cookie = req.header.cookie

    if (cookie){
        const token = cookie.splite("=")[1]
        const id = parseInt(jwt.verify(token,SECRET_KEY)) 
        req.userId = id
        next()
    }
    else{
        res.status(401).json({
            status:"unauthorized"
        })
    }
}

module.exports = {generateToken, verifyToken}