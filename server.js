/**
 * Created by rishabhkhanna on 23/03/17.
 */
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

const app = express();

const server = http.Server(app);
const io = socket(server);


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection' , (socket)=>{
   console.log("connection called");

    socket.on('foo' , (data)=>{
        console.log(data);
    });

    socket.on('sensor' , (data)=>{

        // console.log(JSON.parse(data));
        var json = JSON.parse(data);
        console.log( "x " +  json.accelX);
        console.log( "y " + json.accelY);
        console.log( "z " + json.accelZ);
        socket.emit('car' , data);
    })
});



app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(8888, ()=>{
    console.log("Socket Magic at 8888");
});