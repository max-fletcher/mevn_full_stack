const express = require('express')
const router = express.Router()
const { getAllPosts, createPost, showPost, updatePost, deletePost } = require('../controllers/posts')

router.get('/', getAllPosts)
router.post('/', createPost)
router.get('/:id', showPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router