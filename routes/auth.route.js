const {Router} = require('express');
const router = new Router();

const {signUp, verify, logIn} = require('../controller/auth.controller')
const {initialUserCheck} = require('../middleware/initialUserCheck')
const {userExist} = require('../middleware/userExist')
const {initialLoginCheck} = require('../middleware/initialLoginCheck')
const {initialVerifyCheck} = require('../middleware/intialVerifyCheck')

router.post('/signup',initialUserCheck, userExist, signUp);
router.get('/verify',initialVerifyCheck, verify)
router.get('/login', initialLoginCheck, logIn)

module.exports = router;