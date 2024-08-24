import express from "express";
import http from 'http';
import {Server as SocketServer} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket =>{
    console.log('client connected')

    socket.on('message', (body)=>{ //cuando escuche el evento message nosotros vamos a recibir datos del frontend
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        })// reenvía el mensaje (data) a todos los demas clientes conectados
        // excepto al que originalmente envio el mensaje.
    })
})

server.listen(4000)
console.log('Server on port', 4000)