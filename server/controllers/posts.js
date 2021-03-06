const Post = require('../models/Post')
const StatusCodes = require('http-status-codes')
const { BadRequestError, NotFoundError, CustomAPIError } = require('../errors')

const getAllPosts = async (req, res)=>{

   // This is the format for throwing custom errors using CustomApiError might not be needed
   // throw new CustomAPIError('Error Dumbass', 401)
   
      // const jobs = await Job.find({createdBy: req.user.userId}).sort('-createdAt')
      // res.status( StatusCodes.OK ).json({ count: jobs.length, jobs: jobs })

      const posts = await Post.find({}).sort('-createdAt')

      res.status( StatusCodes.OK ).json({ msg: "All Posts", data: posts })
   }

   const createPost = async (req, res)=>{
      const title = req.body.title
      const category = req.body.category
      const description = req.body.description
      const file_path = req.body.file_path
      const file_url = req.body.file_url
      // console.log(file_path)

      const post = await Post.create({ title: title, category: category, description: description, image: file_path, image_url: file_url })

      res.status( StatusCodes.CREATED ).json({ msg: "Post Created", data: post })
   }

   const showPost = async (req, res)=>{
      // 5 lines below is my way of doing things
      // const job = await Job.findOne({createdBy: req.user.userId, _id: req.params.id})
      // if(!job){
      //    throw new NotFoundError("Job with this ID not found !")
      // }
      // res.status( StatusCodes.OK ).json({job: job})
   
      // store request data into variables. 'user' data is appended to request due to authorization middleware that we previously setup.
      // const userId = req.user.userId
      // const jobId = req.params.id

      const postId = req.params.id
   
      const post = await Post.findOne({
         _id: postId
      })
   
      if(!post){
         throw new NotFoundError(`Post with ID ${postId} not found !`)
      }
   
      res.status( StatusCodes.OK ).json({ msg: "Show Job", data: post })
   }

   const updatePost = async (req, res)=>{

      const postId = req.params.id
      const title = req.body.title
      const category = req.body.category
      const description = req.body.description
      const file_path = req.body.file_path
      const file_url = req.body.file_url

      const post = await Post.findOneAndUpdate({ _id: postId}, {title: title, category: category, description: description, image: file_path, image_url: file_url}, {
         new: true,
         runValidators: true
      })

      if(!post){
         throw new NotFoundError(`Post with ID ${postId} not found !`)
      }

      // console.log(file_path, req.body)
      // process.exit()
      
      // if(!title || !description){
      //    throw new BadRequestError(`Title, description and category required`)
      // }
   
      res.status(StatusCodes.OK).json({ msg: "Post Updated", data: post })
   }

   const deletePost = async (req, res)=>{
      const postId = req.params.id
      const post = await Post.findOneAndDelete({_id: postId})
   
      if(!post){
         throw new NotFoundError(`Post with ID ${postId} not found !`)
      }
   
      res.status(StatusCodes.OK).json({msg: "Deleted Job"})
   }

   module.exports = { getAllPosts, createPost, showPost, updatePost, deletePost }