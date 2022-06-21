const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')// importing JWT pac
require('dotenv').config();

const UserSchema = new mongoose.Schema({
   name:{
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50
   },
   email:{
      type: String,
      required: [true, 'Please provide email'],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         , "Please Provide Valid Email"
      ],
      unique: [true, "Email already used ! Please provide a new one."]
   },
   password:{
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6
   }
   // setting timestamps when saving a model instance
},{timestamps: true})

// **IMPORTANT You will notice that bcrypt package works asynchronously so we use async and await with it. We however, don't use async with
// the creating JWT function since that package doesn't use promises.

// Pre is a lifecycle hook. Pre is used to do something before an action by model.
// Pre with 1st param "save" is executed before a mongoose model is saved to DB. Post is for after.
// use traditional function in pre instead of an arrow function since callbacks can't access local scopes/variables i.e this.password
UserSchema.pre('save', async function(next) {
   // creating hashed password.
   const salt = await bcrypt.genSalt(10) // get random bytes used for encryption
   console.log(salt)
   this.password = await bcrypt.hash(this.password, salt) // encrypt password using salt
   console.log(this.password)
});

// The function below is called an instance method. It is used to generate JSON webtoken. It acts like an accessor in Laravel.
// It can be used in controller like this -> "user.createJWT" where user is a model instance use traditional function here instead of an
// arrow function since callbacks can't access local scopes/variables i.e this.name
UserSchema.methods.createJWT = function(){
   // create and return JSON Webtoken
   return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME } )
}

// The function below is called an instance method. It is used to generate JSON webtoken. It acts like an accessor in Laravel.
// It can be used in controller like this -> "user.comparePassword(param1)" where user is a model instance use traditional function
// here instead of an arrow function since callbacks can't access local scopes/variables i.e this.password
// This here matches the current model instance password with the provided password(candidatePassword)
UserSchema.methods.comparePassword = async function( candidatePassword ){
   const isMatch = await bcrypt.compare(candidatePassword, this.password)
   return isMatch
}

module.exports = mongoose.model( 'user', UserSchema)