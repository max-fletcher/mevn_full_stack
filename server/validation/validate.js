   const { create_post_schema, update_post_schema } = require('./schema/JoiSchema')
   const { CustomAPIError } = require('../errors/index')

   const validate_post_create = async (req, res, next) => {
      const body = req.body
      // console.log(body)

      const {error, value} = create_post_schema.validate(req.body)
      if(error){
         error.type = "joi_error"
         // throw new Error(error, 422)
         throw new CustomAPIError(error, 422)
         // return res.status(400).send({error : error})
      }

      next()
   }

   const validate_post_update = (req, res, next) => {
      const body = req.body
      // console.log(body)

      const {error, value} = update_post_schema.validate(req.body)
      if(error){
         throw new CustomAPIError(error, 422)
         // return res.status(400).send({error : error})
      }

      next()
   }

   module.exports = {
      validate_post_create, validate_post_update
   }