import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
 
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors'

import { fileURLToPath } from 'url';
import { verifyToken } from './middleware/Auth.js';

import { register } from './controllers/auth.js'
import { creatPost } from './controllers/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import testRoutes from './routes/test.js';

 
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);   
const __dirname = path.dirname(__filename);  // current dir path
dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan('common'))
app.use(bodyParser.json({ limit:'30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true}))

 

app.use('/api/assets',express.static(path.join(__dirname, 'public/assets')))
app.use(cors())

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
app.post('/api/auth/register', upload.single('picture'), register)
app.post('/api/posts', verifyToken, upload.single('picture'), creatPost)

/* ROUTES */
 
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/test', testRoutes)

app.get('/', (req, res) => res.send('Server is Ready'))
app.get('/test', (req, res) => res.sendFile('testing'))


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
     app.listen(PORT,()=> console.log(`Server is running at port ${PORT} `));

}).catch((err)=> console.log(` ${err} did not connect `))
