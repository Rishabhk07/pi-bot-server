/**
 * Created by rishabhkhanna on 23/03/17.
 */
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const control = require('../onoff-npm/controls');
const app = express();

const server = http.Server(app);
const io = socket(server);

var port = process.env.PORT || 8888;

process.argv.forEach(function (val, index, array) {
    if(index != 1 && index != 0){

        console.log(val);
    }
});



app.use(express.static(path.join(__dirname, 'public')));

io.on('connection' , (socket)=>{
   console.log("connection called");

    socket.emit("connection" , {data: "Rishabh Khanna"});


    socket.on('foo' , (data)=>{
        console.log(data);
    });

    socket.on('sensor', (data)=>{
        // console.log(JSON.parse(data));
        var json = JSON.parse(data);
        console.log(json);
        console.log( "x " +  json.accelX);
        console.log( "y " + json.accelY);
        console.log( "z " + json.accelZ);
        io.emit("car", data);
        // socket.broadcast.emit('other', data);
    });

    socket.on('control' , (data)=>{
        //car control from mobile buttons
        console.log(JSON.parse(data));
	data = JSON.parse(data);
        if(data.direction == "left"){
            control.left();
        }else if(data.direction == "right"){
            control.right();
        }else if(data.direction == "forward"){
            control.forward();
        }else if(data.direction == "backward"){
            control.backward();
        }else if(data.direction == "stop"){
            control.stop();
        }
    })
});

module.exports =

app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(port, ()=>{
    console.log("Socket Magic at " + port);
});
