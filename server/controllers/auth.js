const User = require('../models/User') // import user model
// import status codes package
const StatusCodes = require('http-status-codes')
// const bcrypt = require('bcryptjs') // moved to Model so controller won't be bloated
// const jwt = require('jsonwebtoken')// moved to Model so controller won't be bloated
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')

const register = async (req, res)=>{
   console.log(req.body)
   
   //////////////////// moved to Model so controller won't be bloated
   // const { name, email, password } = req.body
   // // creating hashed password.
   // const salt = await bcrypt.genSalt(10) // get random bytes used for encryption
   // const hashedPassword = await bcrypt.hash(password, salt) // encrypt password using salt

   // const tempUser = { name, email, password:hashedPassword } // contains original name, email but replacing the password with its hashed variant
   // console.log(tempUser)

   // code below can be substituted with this -> const user = await User.create({ ...req.body })
   // const user = await User.create({ name: tempUser.name, email: tempUser.email, password: tempUser.password })
   //////////////////// end

   // code below can be substituted with this -> const user = await User.create({ ...req.body })
   const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password })

   // generate token using model instance methods (a.k.a accessor in Laravel). Its defined as UserSchema.methods.createJWT. See in model.
   const token = user.createJWT()
   
   // difference betw this "res.status(StatusCodes.CREATED).json( user )" and res.status(StatusCodes.CREATED).json({ user })
   // is that the below one wraps the variables into a user object before sending back.
   // res.status(StatusCodes.CREATED).json({ user }) can also be written as res.status(StatusCodes.CREATED).json({ user: user })
   // res.status( StatusCodes.CREATED ).json({ user: { name: user.name }, token })
   // We replaced the above line with line below. user.getName() is a getter function defined inside the user model. See in model.
   res.status( StatusCodes.CREATED ).json({ user: { name: user.name }, token })

   // res.send('hit')
}

const login = async (req, res)=>{
   const { email, password } = req.body

   if(!email||!password){
      throw new BadRequestError('Please provide email and password')
   }

   const user = await User.findOne({ email: email })

   if(!user){
      throw new UnauthenticatedError('Invalid Credentials')
   }

   // checking if password matches using model instance methods (a.k.a accessor in Laravel). Its defined as UserSchema.methods.comparePassword.
   const isPasswordCorrect = await user.comparePassword(password)
   
   console.log(isPasswordCorrect)

   if(!isPasswordCorrect){
      throw new UnauthenticatedError("Password doesn't match ! Please try again.")
   }

   const token = user.createJWT()
   res.status(StatusCodes.OK).json({ user:{ name: user.name }, token })
}

module.exports = { login, register }