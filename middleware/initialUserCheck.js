const {isValidEmail} = require('../validation/email.validation');
const {isValidPassword} = require('../validation/password.validation')

const initialUserCheck = (req, res, next) =>{
    const {name, email, password} = req.body;
    if (
        typeof name !== "string" ||
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
    next()
}
module.exports = {initialUserCheck}