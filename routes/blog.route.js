const {Router} = require('express');
const router = new Router();

const {verifyToken, cofirmSelf} = require('../middleware/auth');

const {blogs, uploadBlog, updateBlog, deleteBlog} = require('../controller/blog.controller');
const {upload} = require('../middleware/multer');

router.get("/",blogs);
router.post('/create', verifyToken, upload.single("image"),uploadBlog);
router.patch('/:id', verifyToken, updateBlog);
router.delete('/:id',verifyToken,cofirmSelf,deleteBlog);

module.exports = router;