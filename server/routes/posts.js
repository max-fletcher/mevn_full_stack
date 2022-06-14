const express = require('express')
const router = express.Router()
const { getAllPosts, createPost, showPost, updatePost, deletePost } = require('../controllers/posts')
const { validate_post_create, validate_post_update, delete_post_image } = require('../validation/validate')

router.get('/', getAllPosts)
router.post('/', validate_post_create, createPost)
router.get('/:id', showPost)
router.patch('/:id', validate_post_update, updatePost)
router.delete('/:id', delete_post_image, deletePost)

module.exports = router