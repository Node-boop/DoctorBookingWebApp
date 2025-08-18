import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path'
import {v4 as uuidv4} from 'uuid'




const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})


import {ExpressPeerServer} from 'peer'


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/',async(req,res)=>{
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room',async(req,res)=>{
  const roomId= req.params.room
  res.render('room',{roomId:roomId})
  console.log(roomId)

})

server.listen(5000, () => {
  console.log('Server is running on port 5000')
})