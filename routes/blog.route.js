const {Router} = require('express');
const router = new Router();

const {upload} = require('../controller/blog.controller')

router.use('/upload/:id',upload)

module.exports = router;