/**
 * Created by rishabhkhanna on 23/03/17.
 */
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();

const server = http.Server(app);
const io = socket(server);

io.on('connection' , (socket)=>{
   console.log("connection called");

    socket.on('foo' , (data)=>{
        console.log(data);
    })
});

app.use('/', (req , res)=>{
   res.send("Socket magic happening here ");
});

server.listen(8888, ()=>{
    console.log("Socket Magic at 8888");
});