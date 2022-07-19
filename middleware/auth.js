const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const {config} =require('../config/config')

const generateToken = (id, name, email)=>{
    return jwt.sign({id, name, email},config.secretKey)    
}

const verifyToken = (req, res, next) =>{
    try {
        // console.log("i am verifytoken  " , req.headers.authorization)
        const cookie = req.headers.authorization
        // console.log(cookie)
        if (!cookie){
            res.status(401).json({
                status:"unauthorized"
            })
        }
        const token = cookie.split(" ")[1]
        // console.log(token)  
        const decode = jwt.verify(token,config.secretKey)
        // console.log(decode)
        req.userValues = decode
        console.log("i am verification")
        next()
    } catch (error) {
        res.status(500).json({title:"error", message:error})
    }
}

const cofirmSelf = async(req, res, next) =>{
    console.log("i am working here in cofirmSelf")
    // console.log(req.userValues.id)
    try {
        // const authUserId = req.userValues.id
        console.log(typeof req.userValues.id)
        const authUserId = req.userValues.id
        const blogId = parseInt(req.params.id)
        // console.log(blogId)
        const blogData = await prisma.blog.findFirst({
            where:{
                id : blogId,

            }
        })
        console.log(typeof blogData.authorId)
        // console.log(authUserId)
        if (authUserId !== blogData.authorId){
            return res.status(401).json({title:"error", message:"this is not author, invalid action"})
        }
        console.log(" in the end")
        next()
    } catch (error) {
        res.status(400).json({title:"error", message:error})
    }
}

module.exports = {generateToken, verifyToken, cofirmSelf}