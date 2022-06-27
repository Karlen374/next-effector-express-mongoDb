import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors'
import staticRouter from './routes/staticRouter.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

const PORT = 5000
const DB_URL=`mongodb+srv://Karlen:123@cluster0.djgxhw3.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use (
  cors()
)
// app.use(express.bodyParser({limit: '50mb'}))
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)
app.use('/auth', authRouter)
app.use('/static', staticRouter)



async function startApp(){
  try{
    await mongoose.connect(DB_URL,{useUnifiedTopology: true , useNewUrlParser: true})
    app.listen(PORT, ()=>console.log('work'))
  }
  catch(e){
    console.log(e)
  }
}

startApp()
