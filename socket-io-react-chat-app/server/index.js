// import packages
import express from 'express';
import http from 'http'
import { Server } from 'socket.io';
import cors from 'cors'


//configuration
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
  }
})

// middleware
app.use(cors())

// socket.io stuff
io.on('connection', (socket) => {
  console.log('New Client Connected')

  socket.on('message', (message) => {
    console.log('Message Received: ', message)
    io.emit('message', message)
  })

  socket.on('disconnect', (message) => {
    console.log('Client disconnected')
  })
})

// run the server 
const PORT = 5000
server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
