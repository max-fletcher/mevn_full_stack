   const { create_post_schema, update_post_schema } = require('./schema/JoiSchema')
   const StatusCodes = require('http-status-codes')
   const path = require('path');
const { log } = require('console');
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

      // file doesn\'t exists i.e required validation
      if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
         let info = {
            field : "file",
            message : "File is required."
         }

         structured_errors.push(info)
      }
      else{ // if file exists
         var file = req.files.file; // store file in variable
         const file_mimetype = file.mimetype // fetch the file mimetype
         const file_size = file.size // fetch the file mimetype
         
         if(!file_mimetype.startsWith('image')){ // if filetype is not an image
            let info = {
               field : "file",
               message : "File must be of type image."
            }
   
            structured_errors.push(info)
         }

         if(file_size > (1024 * 1024 * 10)){  // if filesize is above 10 MB
            let info = {
               field : "file",
               message : "File must below 10 MB"
            }
   
            // console.log(structured_errors)
            structured_errors.push(info)
         }
         
         // console.log("HIT", file_mimetype, file_size, structured_errors)
         // console.log("FILE", file);
         // process.exit()

         var file_path = path.join(__dirname, '..', '..', 'server', 'uploads', 'posts', Date.now().toString() + '_' + file.name).replace(/\\/g,'/')
         // console.log(file_path, typeof(Date.now().toString()))
         // process.exit()
      }
      

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

         // how to find first error based on key(field in this case) inside errors array inside joi_errors object. Right now, its fetching 
         // the first file error generated by above logic
         const result = joi_error.errors.find( ({ field }) => field === 'file' );
         console.log(joi_error, '|', result.message)
         process.exit()

         return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send( {error : joi_error} )
      }
      else{
         // If no errors exist(both joi and file validation), upload file. Also append the file_path to the request body).
         await file.mv(file_path); // (need to onfirm) since we are using express-async-errors package, we don't need to throw errors using callback as 2nd parameter
         req.body.file_path = file_path // appending file path if file was uploaded properly without any errors
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