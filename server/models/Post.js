const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: 50
   },
   category: {
      type: String,
      // required: [true, 'Category is required'],
      enum: ['active', 'inactive'],
      default: 'inactive',
      message: '{VALUE} is not supported as a category'
   },
   description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 1000
   },
   // image: {
   //    type: String,
   //    required: [true, 'Image is required']
   // },
   // content: {
   //    type: String,
   //    enum: ['interview', 'declined', 'pending'],
   //    default: 'pending'
   // },
   // this creates an association to User model(to show who created it. Like a DB relation)
   // createdBy: {
   //    type: mongoose.Types.ObjectId,
   //    ref: 'User',
   //    required: [true, 'Please provide user' ]
   // }
   // setting timestamps when saving a model instance
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)