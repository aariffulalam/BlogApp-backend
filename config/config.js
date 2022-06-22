require('dotenv').config();

const config = {
    postgresUrl : process.env.DATABASE_URL || "postgresql://postgresql:password@localhost:5432/mydb?schema=public",
    port : process.env.PORT,
    secretKey : process.env.SECRET_KEY,
    nodemailerUser : process.env.NODEMAILER_USER,
    nodemailerPassword : process.env.NODEMAILER_PASSWORD,
    twilioSid : process.env.TWILIO_SID,
    twilioAuthToken : process.env.TWILIO_AUTH_TOKEN,
    twilioNumber : process.env.TWILIO_NUMBER
}

module.exports = {config};