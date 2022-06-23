const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const {isValidEmail} = require('../validation/email.validation');
const {isValidPassword} = require('../validation/password.validation')

const initialLoginCheck = async(req, res, next) =>{
    const {email, password} = req.body;
    if (
        typeof email !== "string" ||
        typeof password !== "string"
        ){
            return res.status(400).json({
                title: "error",
                error:"name or email or password's type is not valid"
            })
        }
    if (!(isValidEmail(email))){
        return res.status(400).json({
            title:"error",
            error:"invalid email"
        })
    }
    if (!(isValidPassword(password))){
        res.status(400).json({
            title:"error",
            error: "invalid password."
        })
    }
    const userCount = await prisma.user.count({
            where:{
                email
            }
        })
        if (userCount === 0){
            console.log("user is not exist.")
            return res.status(400).json({
                title:"error",
                error:"user is not exist"
            })
        }

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if (!user.verified){
        return res.status(400).json({title:"error", error:"user is not verified."})
    }
    next()
}
module.exports = {initialLoginCheck}