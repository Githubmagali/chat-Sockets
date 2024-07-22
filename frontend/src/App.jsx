import io from 'socket.io-client';
import React, { useEffect, useState } from 'react'



const socket = io('/');



function AppPage() {

  const[message, setMessage]= useState('');
  const[messages, setMessages]= useState([]);


  const handleSubmit = (e)=>{
    e.preventDefault();
    setMessages([...messages, message])
   socket.emit('message', message)
  };

  useEffect(()=>{
    socket.on('message', message=>{
      console.log(message)
      setMessages([...messages, message])
    })
  }, [])

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='texto....'
        onChange={(e)=>setMessage(e.target.value)}/>
        <button>Send</button>
      </form>

      <ul>
        {
          messages.map((message, index) =>(
            <li key={index}>{message}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default AppPage