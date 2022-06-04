// removed after adding code to accomodate for mongoose errors
// const { CustomAPIError } = require('../errors')

const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

   // console.log(req.body, err, "HIT AGAIN")
   // process.exit()

   // this block/object is for some mongoose errors that are weird and encased in a deeply nested object
   //(i.e unique validation throws a weird error object)
   let customError = {
      // set default i.e if status code exists, then set that status code. Otherwise, store an internal server error
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      // same here but with message
      msg: err.message || 'Something went wrong'
   }

   // removed after adding code to accomodate for mongoose errors
   // if (err instanceof CustomAPIError) {
   //    return res.status(err.statusCode).json({ msg: err.message })
   // }

   // if error is of type validation error, it has multiple nested objects, so it needs to be formatted before being sent
   if(err.name === 'ValidationError'){

      customError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY // i.e status code - 422
      // customError.msg = Object.values(err.errors).map((item) => item.message).join(',') // JOHN SMILGA'S APPROACH

      // kept this here since I don't like the structure that JOHN SMILGA uses. This will replace the line above. It has the error
      // nested properly so it should be easy to pull relevant errors and place them in their proper spaces
      structures_errors = []

      for(let key in err.errors){
         console.log(key, err.errors[key].message)
         let info = {
            field : key,
            message : err.errors[key].message
         }
         structures_errors.push(info)
      }

      const validation_error = 
      {
         error_type: "validation_errors",
      };

      validation_error.errors = structures_errors 
      // console.log(validation_error);

      customError.msg = validation_error
   }

   // this is to accomodate the unique validation error for email, coming from mongoose.
   if(err.code && err.code == 11000){
      customError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY // i.e status code - 422
      // ${Object.keys(err.keyValue) gives the key name nested inside the mongoose validation error object
      customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field ! Please choose another value.`
   }

   // h this block handles cast errors i.e when you provide an invalid ID.
   if(err.name === 'CastError'){
      customError.statusCode = StatusCodes.NOT_FOUND // i.e status code - 404
      customError.msg = `User with ID ${err.value} not found !`
   }

   // replaced line below to also accomodate for errors that are from mongoose and have weird structures
   // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
   return res.status(customError.statusCode).json({ error: customError.msg })
}

module.exports = errorHandlerMiddleware
