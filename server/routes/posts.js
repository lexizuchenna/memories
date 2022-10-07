const express = require('express')

const { createPost, getPosts, updatePost, deletePost, likePost } = require('../controllers/postController')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.patch('/:id/likepost', likePost)
router.delete('/:id', deletePost)

module.exports = router