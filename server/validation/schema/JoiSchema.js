const Joi = require('joi')

const create_post_schema = Joi.object({
   title: Joi.string().min(3).max(100).required(),
   category: Joi.string().valid('active', 'inactive', '')
   .messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      // 'any.required': `"a" is a required field`
      'any.only': `Invalid value for "category" submitted. It should be either active or inactive.`
   }),
   description: Joi.string().max(1000).required(),
   file: Joi.allow(null)
}).options({ abortEarly: false })

const update_post_schema = Joi.object({
   title: Joi.string().min(3).max(100).required(),
   category: Joi.string().valid('active', 'inactive', '')
   .messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      // 'any.required': `"a" is a required field`
      'any.only': `Invalid value for "category" submitted. It should be either active or inactive.`
   }),
   description: Joi.string().max(1000).required(),
   file: Joi.allow(null)
}).options({ abortEarly: false })

module.exports = {
   create_post_schema, update_post_schema
}