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

      // if (!req.files.file) {
      //    return res.status(400).send("No files were uploaded.");
      // }

      // initializing a joi_error object. Will append further data/errors into it if exists
      const joi_error = 
      {
         error_type: "joi_errors",
      };

      let structured_errors = [] // for storing all errors as object

      // file doesn\'t exists
      // if(!req.files || !req.files.file){
      //    let info = {
      //       field : "file",
      //       message : "File is required."
      //    }

      //    structured_errors.push(info)
      // }
      // else{ // if file exists
      //    const file = req.files.file; // store file in variable
      //    const file_mimetype = file.mimetype // fetch the file mimetype
      //    const file_size = file.size // fetch the file mimetype
         
      //    if(!file_mimetype.startsWith('image')){
      //       let info = {
      //          field : "file",
      //          message : "File must be of type image."
      //       }
   
      //       structured_errors.push(info)
      //    }

      //    if(file_size > (1024 * 1024 * 10)){  // if filesize is above 10 MB
      //       let info = {
      //          field : "file",
      //          message : "File must below 10 MB"
      //       }
   
      //       console.log(structured_errors)
      //       structured_errors.push(info)
      //    }
         
      //    console.log("HIT", file_mimetype, file_size, structured_errors)
      //    process.exit()
         
      //    file.mv(path, (err) => {
      //       if (err) {
      //          return res.status(500).send(err);
      //       }
      //       // return res.send({ status: "success", path: path });
      //    });
      // }

      // process.exit()

      const {error, value} = create_post_schema.validate(req.body)

      if(error){

         for(let key in error.details){
            // console.log(key, error.details[key], error.details[key].message)
            let message = error.details[key].message.replaceAll('\"', "")

            let info = {
               field : error.details[key].context.key,
               message : message.charAt(0).toUpperCase() + message.slice(1)
            }
            structured_errors.push(info)
         }
         // return res.status(400).send({error : error})
      }

      // throw error if any exist
      if(structured_errors.length != 0){
         joi_error.errors = structured_errors


         // process.exit()

         return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send( {error : joi_error} )
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

         structured_errors = []

         for(let key in error.details){
            // console.log(key, error.details[key], error.details[key].message)
            let info = {
               field : error.details[key].context.key,
               message : error.details[key].message.replaceAll('\"', "")
            }
            structured_errors.push(info)
         }

         const joi_error = 
         {
            error_type: "joi_error",
         };

         joi_error.errors = structured_errors

         return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({error : joi_error})
         // return res.status(400).send({error : error})
      }

      next()
   }

   module.exports = {
      validate_post_create, validate_post_update
   }