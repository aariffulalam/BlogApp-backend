const twilio = require('twilio');
const {config} = require('../config/config')

const SID = config.twilioSid
const TOKEN = config.twilioAuthToken
const NUMBER = config.twilioNumber

const client = twilio(SID, TOKEN)
const sendsms = (to, otp )=>{
    client.messages
    .create({
        body:`Dear user, this mail is from Blog app. Here is your OTP ${otp} for to enjoy Blog application verify your account.`,
        from:NUMBER,
        to
    })
    .then((message)=>{
        console.log("sms sent successfully.")
    })
}

module.exports = {sendsms}