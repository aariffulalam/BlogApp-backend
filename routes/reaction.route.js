const {Router} = require('express');
const router = new Router();

const {reaction, updateReaction} = require('../controller/reaction.controller')
const {likeOrDislike} = require('../middleware/alreadyLikeOrDislike')

router.post('/:id', reaction)
router.patch('/:id', likeOrDislike, updateReaction)


module.exports = router;    