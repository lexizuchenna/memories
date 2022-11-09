const express = require('express')

const { createPost, getPosts, updatePost, deletePost, likePost } = require('../controllers/postController')
const {isLoggedIn} = require('../middlewares/auth')

const router = express.Router()

router.get('/', getPosts)
router.post('/', isLoggedIn, createPost)
router.patch('/:id', isLoggedIn, updatePost)
router.patch('/:id/likepost', isLoggedIn, likePost)
router.delete('/:id', isLoggedIn, deletePost)

module.exports = router