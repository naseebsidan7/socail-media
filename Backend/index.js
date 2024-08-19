import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { fileURLToPath } from 'url';
import { verifyToken } from './middleware/Auth.js';

import { register } from './controllers/auth.js'
import { creatPost } from './controllers/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import testRoutes from './routes/test.js';

 
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);  console.log(__filename+"filename")
const __dirname = path.dirname(__filename);  // current dir path
dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit:'30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true}))
app.options('*', cors());
app.use(cors({
  origin: 'https://qoott.netlify.app', // Allow requests from your Netlify frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you're using cookies or authentication
}));
app.use('/assets',express.static(path.join(__dirname, 'public/assets')))


/* FILE STORAGE */
const storage = multer.diskStorage({
      destination: function (req, file, cb){
        cb(null, 'public/assets')
      },
      filename: function(req, file, cb){
        cb(null, file.originalname) 
      }
})
const upload = multer({ storage })



/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), creatPost)

/* ROUTES */
app.get('/', (req, res)=> res.send('Server is ready '));
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/test', testRoutes)
 
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
     app.listen(PORT,()=> console.log(`Server is running at port ${PORT} `));

}).catch((err)=> console.log(` ${err} did not connect `))
