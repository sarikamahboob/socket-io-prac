// import packages
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// create instance
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// server static files
app.use(express.static("public"));

// create connection 
io.on('connection', (socket) => {
  console.log('User connected successfully')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  }) 

  socket.on('disconnect', () => {
    console.log('User disconnected successfully')
  })
  
})

// run the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`))