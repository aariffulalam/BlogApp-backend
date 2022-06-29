const nodemailer = require('nodemailer')
const {config} = require('../config/config')


const sendmail = async (to, otp)=>{
    // console.log('Mail section')
    // console.log(config.nodemailerUser,config.nodemailerPassword,config.nodemailerUser)
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user : config.nodemailerUser,
            pass : config.nodemailerPassword
        }
    })
    const mailDetails = {
        from : config.nodemailerUser,
        to,
        subject : "Blog App : Verify your Blog application account.",
        text:`Dear user, this mail is from Blog app. Here is your OTP ${otp} verify your account and enjoy amazing services from Blog app.`
    }
    transport.sendMail(mailDetails, (err, res)=>{
        if (err){
            // console.log("error")
            console.log(err.message)
            // console.log("error")

        }else{
            console.log(`Mail send to ${to}.`)
        }
    })
}
module.exports = {sendmail}