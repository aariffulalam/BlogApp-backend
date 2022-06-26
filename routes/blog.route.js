const {Router} = require('express');
const router = new Router();

const {blogs, uploadBlog, updateBlog} = require('../controller/blog.controller')
const {upload} = require('../middleware/multer')

router.get("/",blogs)
router.post('/:id',upload.array("image"),uploadBlog)
router.patch('/:id', updateBlog)

module.exports = router;