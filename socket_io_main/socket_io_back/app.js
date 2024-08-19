import express from "express"
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"

const port = 3000;

const app = express();
const server = createServer(app)
const io = new Server(server, {
  path: '/about/',
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})

// app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
})

// const secretKeyJWT = "123456789"

// app.get("/login", (req, res) => {
//   const token = jwt.sign({_id: "123456"}, secretKeyJWT)
//   res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"}).json({
//     message: "Login Success"
//   })
//   res.send("Hello World!");
// })

// const user = false;

// io.use((socket, next)=> {
//   cookieParser()(socket.request, socket.request.res, (err) => {
//     if(err) return next(err);
//     const token = socket.request.cookies.token;
//     if(!token) return next(new Error("Authentication Error"));
//     const decoded = jwt.verify(token, secretKeyJWT)
//     next()
//   })
// })

// io.of("/").on("connection", (socket) => {
io.on("connection", (socket) => {
  console.log('someone connected');
  socket.emit("connected", `Connected to Socket`)
  socket.emit("welcome-server", `welcome to the server ${socket.id}`)
  socket.on("user-emit", (data) => {
    console.log("User emitted data catch here", {data})
  })
  socket.on("message-about", (data) => {
    io.emit("receive-message-about", data);
  })
  // socket.emit("connect", `Connected to the`);
  socket.on("room-message", ({message, room}) => {
    console.log(message, room)
    // io.emit("receive-message-home", data?.message);
    io.to(room).emit("received-message-home", message);
    // socket.broadcast.emit("received-message-home", message);
  })
  socket.on("room-name", (room) => {
    socket.join(room)
  })
  socket.emit("welcome", `welcome to the server ${socket.id}`)
  socket.broadcast.emit("welcome", `${socket.id} joined the server`)
  socket.on("disconnect", (disconnect) => {
    console.log(disconnect)
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})