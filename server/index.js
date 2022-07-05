import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors'
import staticRouter from './routes/staticRouter.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import messageRouter from './routes/messages.js';
import ws from 'ws';

const PORT = 5000
const DB_URL=`mongodb+srv://Karlen:123@cluster0.djgxhw3.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use (
  cors()
)

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)
app.use('/auth', authRouter)
app.use('/static', staticRouter)
app.use('/message',messageRouter)



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

const wss = new ws.Server({
  port: 5001,
}, () => console.log(`WS Server started on 5001`))


wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
      message = JSON.parse(message)
      switch (message.event) {
          case 'message':
              broadcastMessage(message,ws)
              break;
          case 'write':
              broadcastMessage(message,ws)
              break;
      }
  })
})

function broadcastMessage(message, ws) {
  wss.clients.forEach(client => {
      if (client !== ws) client.send(JSON.stringify(message))
  })
}

function broadcastConnection(message) {
  wss.clients.forEach(client => {
      client.send(JSON.stringify(message))
  })
}