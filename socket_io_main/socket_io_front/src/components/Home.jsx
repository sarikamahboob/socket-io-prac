import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const Home = () => {
  const socket = io('http://localhost:3000',{
    path: '/about/'
  });

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState('')
  const [room, setRoom] = useState('')
  const [socketId, setSocketId] = useState('')
  const [roomName, setRoomName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("room-message", {message, room})
  }

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("room-name", roomName)
    setRoomName("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log('connected in main')
    })
    socket.on("received-message-home", (data) => {
      console.log(data, 'here')
      setMessages((messages)=> [...messages, data])
    })
    socket.on("welcome", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [])

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <Typography variant="h5" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <TextField value={roomName} onChange={e =>setRoomName(e.target.value)} id="standard-basic" label="Room Name" variant="standard" />
        <Button type="submit" variant="contained">Join</Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={e =>setMessage(e.target.value)} id="standard-basic" label="Message" variant="standard" />
        <TextField value={room} onChange={e =>setRoom(e.target.value)} id="standard-basic" label="Room" variant="standard" />
        <Button type="submit" variant="contained">Send</Button>
      </form>
      <Stack>
        {
          messages?.length > 0 && messages?.map((message, index) =>(
            <Typography variant="h5" gutterBottom key={index}>
              {message}
            </Typography>
          ))
        }
      </Stack>
    </div>
  )
}

export default Home