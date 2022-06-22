const {Router} = require('express');
const router = new Router();

const {reaction} = require('../controller/reaction.controller')
const {likeOrDislike} = require("../middleware/likeOrDislike")


router.post('/:id',likeOrDislike,reaction)

module.exports = router;