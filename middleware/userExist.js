const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const userExist = async(req, res, next)=>{
    const {email} = req.body
    try {
        const userCount = await prisma.user.count({
            where:{
                email
            }
        })
        if (userCount === 1){
            console.log("user already exist.")
            return res.status(400).json({
                title:"error",
                error:"user already exist"
            })
        }
        next()
    }
     catch (error) {
        console.log(error.message)
        res.status(400).json({
            title:"error",
            error: error.message
        })    
    }
}

module.exports = {userExist}