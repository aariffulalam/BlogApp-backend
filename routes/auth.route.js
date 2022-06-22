const {Router} = require('express');
const router = new Router();

const {signUp, logIn} = require('../controller/auth.controller')
const {initialUserCheck} = require('../middleware/initialUserCheck')
const {userExist} = require('../middleware/userExist')
const {initialLoginCheck} = require('../middleware/initialLoginCheck')


router.post('/signup',initialUserCheck, userExist, signUp);
router.get('/login', initialLoginCheck, logIn)

module.exports = router;