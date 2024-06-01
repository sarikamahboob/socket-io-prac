import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const About = () => {
  const socket = io('http://localhost:3000',{
    path: '/about/'
  });

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message-about", message)
  }

  useEffect(() => {
    if (socket) {
      socket.on('connected', (data) => {
        console.log('Connected to socket server', data);
      });
      socket.on('welcome-server', (data) => {
        socket.emit('user-emit', data);
      });
      socket.on("receive-message-about", (data) => {
        console.log(data)
        setMessages((messages)=> [...messages, data])
      })

      // return () => {
      //   socket.off('connect');
      //   socket.off('message');
      // };
    }
  }, []);

  return (
    <div>
      <h1>Custom Path Component</h1>
      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={e =>setMessage(e.target.value)} id="standard-basic" label="Message" variant="standard" />
        <Button type="submit" variant="contained">Send</Button>
      </form>
      {
        messages?.length > 0 && messages?.map((message, index) =>(
          <Typography variant="h5" gutterBottom key={index}>
            {message}
          </Typography>
        ))
      }
    </div>
  );
}

export default About