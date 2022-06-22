const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const  bcrypt = require('bcrypt')

const {generateToken} = require('../middleware/auth')
const {otp} = require('../service/otp.service')
const {sendmail} = require('../service/mail.service')
const {sendsms} = require('../service/sms.service')



const signUp = async (req, res)=>{
    const {name, phoneNumber,email, password, confirmPassword, gender, dateOfBirth, bio} = req.body
    try{
        // console.log("signup is working")
        if (password !== confirmPassword){
            return res.status(400).json({
                title: "error",
                error: "confirm password and password are not matched."
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data:{
                name,
                phoneNumber,
                email,
                password : hashedPassword,
                gender,
                dateOfBirth,
                bio
            }
        })
        // console.log(hashedPassword)
        await sendmail(email,otp)
        await sendsms(phoneNumber, otp)
        res.status(201).json({
            title:"SignedUp",
            message:user
        })
    }catch(error){
        res.status(400).json({
            title:"error",
            message:"fat gaya",
            error : error.message
        })
    }
}


const logIn = async ( req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        const match = await bcrypt.compare(password, user.password)
        // console.log(match)
        if (match){
            // console.log(user.id)
            const token = generateToken(user.id)
            // console.log(token)
            res.cookie("authToken",token)
            res.status(201).json({
                title:"LogedIn",
                message:user
            })
        }
        else{
            res.status(400).json({message:"user password i wrong"})
        }
    } catch (error) {
        res.status(400).json({
            title:"error",
            message:"fat gaya",
            error:error
        })
    }
}

module.exports = {signUp,logIn}