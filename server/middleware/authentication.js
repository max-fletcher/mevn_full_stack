const User  = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/')

const auth = (req, res, next)=>{
   // check header
   const authHeader = req.headers.authorization
   if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('Invalid authentication')
   }

   const token = authHeader.split(' ')[1]

   try{
      const payload = jwt.verify(token, process.env.JWT_SECRET) // decrypt and verify if the user has a valid token

      // the 2 lines below can be used to confirm if the user has a record in DB. Right now, its not useful. select('-password') removes 
      // the password from the object
      // const user = User.findById(payload.id).select('-password')
      // req.user = user

      // attach the user to the jobs routes
      req.user = { userId: payload.userId, name: payload.name }
      next()
   }
   catch(error){
      throw new UnauthenticatedError('Invalid authentication')
   }
}

module.exports = auth