import { useEffect } from "react";
import { io } from "socket.io-client"

function App() {
  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected in main')
    })
    socket.on("welcome", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [])
  return (
    <>
      <p className="read-the-docs">
        App
      </p>
    </>
  )
}

export default App
