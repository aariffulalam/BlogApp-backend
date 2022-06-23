const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {isValidEmail} = require('../validation/email.validation')

const initialVerifyCheck = async (req, res, next)=>{
    const {email, otp} = req.body;
    try {
        
        if (typeof email !== "string" || typeof otp !== "string"){
            return res.status(400).json({title:"error", error:"email or otp type is not valid."});
        }

        if (!isValidEmail(email)){
            return res.status(400).json({title:"error", error:"email is not valid."});
        }

        const userUount = await prisma.user.count({
            where:{
                email
            }
        })
        if (userUount === 0){
            return res.status(400).json({title:"error",error:"user not exist."})
        }

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if (user.verified){
            return res.status(400).json({title:"error",error:"user already verified."})
        }
        next()
    } catch (error) {
        res.status(500).json({title:"error",error:error.message})
    }
        
}
module.exports = {initialVerifyCheck}