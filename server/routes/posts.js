const express = require('express')
const router = express.Router()
const { getAllPosts, createPost, showPost, updatePost, deletePost } = require('../controllers/posts')
const { validate_post_create, validate_post_update } = require('../validation/validate')

router.get('/', getAllPosts)
router.post('/', createPost)
router.get('/:id', showPost)
router.patch('/:id', validate_post_update, updatePost)
router.delete('/:id', deletePost)

module.exports = router