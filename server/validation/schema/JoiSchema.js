const Joi = require('joi')

const create_post_schema = Joi.object({
   title: Joi.string().min(3).max(100).required(),
   category: Joi.string().valid('active', 'inactive', ''),
   description: Joi.string().max(1000).required()
}).options({ abortEarly: false })

const update_post_schema = Joi.object({
   title: Joi.string().min(3).max(100).required(),
   category: Joi.string().valid('active', 'inactive', ''),
   description: Joi.string().max(1000).required()
}).options({ abortEarly: false })

module.exports = {
   create_post_schema, update_post_schema
}