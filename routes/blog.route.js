const {Router} = require('express');
const router = new Router();

const {uploadBlog, updateBlog} = require('../controller/blog.controller')


router.post('/:id',uploadBlog)
router.patch('/:id', updateBlog)

module.exports = router;