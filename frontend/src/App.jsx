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
    <div className='flex flex-col gap-x-10 items-center justify-center pt-10'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='texto....' className=" border border-gray-500 mx-10"
        onChange={(e)=>setMessage(e.target.value)}/>
        <button className='border px-2'>Send</button>
      </form>

      <ul className=' w-96 flex flex-col gap-y-2'>
        {
          messages.map((message, index) =>(
            <li key={index} className= {` py-2 my-2 table rounded-md ${message.from === 'Me' ? 'bg-zinc-200' : 'bg-zinc-100 ml-auto'}`}>
              {message.from}:{message.body}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default AppPage