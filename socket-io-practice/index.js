// packages
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

// instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serving html file
const __dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => res.sendFile(join(__dirname, 'index.html')))

// define a connection event handler

io.on('connection', (socket) => {
  console.log("user connected to the server")
  // emit a message event to the client
  socket.emit('message', 'Welcome to the server')
  socket.on('new message', (message) => {
    console.log(message)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected from the server')
  })
})


// start the server
const PORT = 3000
server.listen(PORT, () => console.log(`Server running on port : ${PORT}`) )


