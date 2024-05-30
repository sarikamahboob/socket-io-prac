import express from "express"
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})

app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
})

io.on("connection", (socket) => {
  socket.emit("welcome", `welcome to the server ${socket.id}`)
  socket.broadcast.emit("welcome", `${socket.id} joined the server`)
  socket.on("disconnect", (disconnect) => {
    console.log(disconnect)
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})