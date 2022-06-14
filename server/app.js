// imports
require('dotenv').config();
require('express-async-errors');

// Packages that ensure security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const res = require('express/lib/response')
const app = express()
// const authenticateUser = require('./middleware/authentication') // import authenticate middleware to check if a user is logged in (i.e has JWT)

// Express File Upload
const fileUpload = require("express-fileupload");
app.use(fileUpload({
      // limits: {
      //    fileSize: 1024 * 1024 * 10 // 10 MB
      // },
      createParentPath: true,
      // abortOnLimit: true
      // preserveExtension: true,
      // useTempFiles: true
   })
);

// connectDB
const connectDB = require('./db/connect')

// routers
// const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// some extra packages to use for security
// app.set('trust proxy', 1) // According to docs, if the hosting you are using is behind a reverse proxy, add this line.
app.use(rateLimiter({ windowMs: 15*60*1000, max: 1000 })); // rate limiter
app.use(express.json()); // parses json data so express can use it
// app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
// app.use('/api/v1/auth', authRouter)
// a middleware "AuthenticateUser" is applied here instead of the controller functions individually.
// app.use('/api/v1/jobs', authenticateUser , jobsRouter)
app.use('/api/v1/posts' , postsRouter)

// fallback routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
   try {
      await connectDB(process.env.DB_URI)
      app.listen(port, () =>
         console.log(`Server is listening on port ${port}...`)
      );
   } catch (error) {
      console.log(error);
   }
};

start();
