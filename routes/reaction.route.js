const {Router} = require('express');
const router = new Router();

// const {reaction, updateReaction, getReaction} = require('../controller/reaction.controller')
const {reaction, getReaction} = require('../controller/reaction.controller')
const {likeOrDislike} = require('../middleware/alreadyLikeOrDislike')
const {verifyToken} = require('../middleware/auth')

router.get("/:postid",getReaction)
router.post('/post/:postid',reaction)
// router.patch('/:id', likeOrDislike, updateReaction)


module.exports = router;    