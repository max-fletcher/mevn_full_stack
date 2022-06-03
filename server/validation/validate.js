   const { create_post_schema, update_post_schema } = require('./schema/JoiSchema')
   const StatusCodes = require('http-status-codes')
   // const { CustomAPIError } = require('../errors/index')

   const validate_post_create = async (req, res, next) => {
      // const body = req.body
      // console.log(body)

      // if you want to throw all errors as a string
      // const {error, value} = update_post_schema.validate(req.body)
      // if(error){
      //    throw new CustomAPIError(error, 422)
      // }

      const {error, value} = create_post_schema.validate(req.body)
      if(error){

         structures_errors = []

         for(let key in error.details){
            // console.log(key, error.details[key], error.details[key].message)
            let info = {
               field : error.details[key].context.key,
               message : error.details[key].message.replaceAll('\"', "")
            }
            structures_errors.push(info)
         }

         const joi_error = 
         {
            error_type: "joi_error",
         };

         joi_error.errors = structures_errors

         return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({error : joi_error})
         // return res.status(400).send({error : error})
      }

      next()
   }

   const validate_post_update = (req, res, next) => {
      // const body = req.body
      // console.log(body)

      // if you want to throw all errors as a string
      // const {error, value} = update_post_schema.validate(req.body)
      // if(error){
      //    throw new CustomAPIError(error, 422)
      // }

      const {error, value} = create_post_schema.validate(req.body)
      if(error){

         structures_errors = []

         for(let key in error.details){
            // console.log(key, error.details[key], error.details[key].message)
            let info = {
               field : error.details[key].context.key,
               message : error.details[key].message.replaceAll('\"', "")
            }
            structures_errors.push(info)
         }

         const joi_error = 
         {
            error_type: "joi_error",
         };

         joi_error.errors = structures_errors

         return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({error : joi_error})
         // return res.status(400).send({error : error})
      }

      next()
   }

   module.exports = {
      validate_post_create, validate_post_update
   }