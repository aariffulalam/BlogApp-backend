const {Router} = require('express');
const router = new Router();

const {signUp, verify, logIn} = require('../controller/auth.controller')
const {initialUserCheck} = require('../middleware/initialUserCheck')
const {userExist} = require('../middleware/userExist')
const {initialLoginCheck} = require('../middleware/initialLoginCheck')
const {initialVerifyCheck} = require('../middleware/intialVerifyCheck')

router.post('/signup',initialUserCheck, userExist, signUp);
router.post('/verify',initialVerifyCheck, verify)
router.post('/login', initialLoginCheck, logIn)
// router.post('/userId')

module.exports = router;