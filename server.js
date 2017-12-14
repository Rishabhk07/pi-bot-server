/**
 * Created by rishabhkhanna on 23/03/17.
 */
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const control = require('./controls');
const app = express();
const where = require('node-where');
const axios = require('axios');

const server = http.Server(app);
const io = socket(server);
let users = {
    rishabh: 'rishabh'
};
var port = process.env.PORT || 8888;
var controlValue = "stop";

process.argv.forEach(function (val, index, array) {
    if (index != 1 && index != 0) {

        console.log(val);
    }
});


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log("connection called");

    socket.emit("connection", {data: "Rishabh Khanna"});


    socket.on('foo', (data) => {
        console.log(data);
    });

    socket.on('sensor', (data) => {
        // console.log(JSON.parse(data));
        var json = JSON.parse(data);
        console.log(json);
        console.log("x " + json.accelX);
        console.log("y " + json.accelY);
        console.log("z " + json.accelZ);
        io.emit("car", data);
        // socket.broadcast.emit('other', data);
    });

    socket.on('control', (data) => {
        //car control from mobile buttons
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        if (data.direction == "left") {
            control.left();
        } else if (data.direction == "right") {
            control.right();
        } else if (data.direction == "forward") {
            control.forward();
        } else if (data.direction == "backward") {
            control.backward();
        } else if (data.direction == "stop") {
            control.stop();
        }
    })

    socket.on('sensorControl', (data) => {
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        if (data.direction != controlValue) {
            controlValue = data.direction;
            if (controlValue == "stop") {
                control.stop();
                console.log("sensor stop called");
            } else if (controlValue == "left") {
                control.left();
                console.log("sensor left called");
            } else if (controlValue == "right") {
                control.right();
                console.log("sensor right called");
            } else if (controlValue == "forward") {
                control.forward();
                console.log("sensor forward called");
            } else if (controlValue == "backward") {
                control.backward();
                console.log("sensor backward called");
            }
        }


    })

//    get location from the server

    axios.get('https://api.ipify.org?format=json').then(function (response) {
        where.is(response.data.ip, function (err, result) {
            if (result) {
                console.log('City: ' + result.get('city'));
                console.log('State / Region: ' + result.get('region'));
                console.log('State / Region Code: ' + result.get('regionCode'));
                console.log('Zip: ' + result.get('postalCode'));
                console.log('Country: ' + result.get('country'));
                console.log('Country Code: ' + result.get('countryCode'));
                console.log('Lat: ' + result.get('lat'));
                console.log('Lng: ' + result.get('lng'));
                socket.emit('location', {
                    lat: result.get('lat'),
                    longi: result.get('lng')
                })
            }
        });
    })

});


app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/auth', (req,res)=>{
    users[req.data.user.split('@')[0]] = req.data.password;
    res.send(req.data)
});

server.listen(port, () => {
    console.log("Socket Magic at " + port);
});
