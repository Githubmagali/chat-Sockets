import io from 'socket.io-client';
import React, { useEffect, useState } from 'react'



const socket = io('/'); //Nos va a permitir enviar eventos al back



function AppPage() {

  const[message, setMessage]= useState('');
  const[messages, setMessages]= useState([]);


  const handleSubmit = (e)=>{
    e.preventDefault();

    const newMessage = {
      body: message,
      from: 'Me'
    }



    setMessages([...messages, newMessage])
   socket.emit('message', message)//emit envia un evento a socket llamado 'message'
  };

  useEffect(()=>{
    socket.on('message', receiveMessage); //para que no se reinicie el estado y vuelva desde 0

    return ()=>{
      socket.off('message', receiveMessage)
    };
  }, [])//cuando el componente se monta se reriza solo una vez

const receiveMessage = (message)=>
  setMessages((state)=>[...state, message]);
  
  return (
    <div className='flex  gap-x-10 items-center justify-center h-screen'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='texto....' className=" border border-gray-500"
        onChange={(e)=>setMessage(e.target.value)}/>
        <button className='border px-2'>Send</button>
      </form>

      <ul className='flex flex-col gap-y-8'>
        {
          messages.map((message, index) =>(
            <li key={index} className= {`px-20 py-2 rounded-md ${message.from === 'Me' ? 'bg-zinc-300' : 'bg-zinc-100'}`}>
              {message.from}:{message.body}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default AppPage