/**
 * Created by rishabhkhanna on 02/05/17.
 */
const gpio = require('onoff').Gpio;
//left front and right backward
var pin17 = new gpio(17 , 'out');
var pin27 = new gpio(27 , 'out');

//right front anf left backward
var pin22 = new gpio(22 , 'out');
var pin10 = new gpio(10 , 'out');

function forward() {
    // all tiers move in single direction - ie forward
    pin27.write(1 , function () {
        console.log("true on pin 27")
    });
    pin17.write(0 , function () {
        console.log("false on pin 17");
    });

    pin10.write(1 , function () {
        console.log("true on pin 10");
    });
    pin22.write(0 , function () {
        console.log("false on pin 22");
    });

}

function backward() {
    // all tiers move in single direction - ie backward




    pin17.write(1 , function () {
        console.log("true on pin 17");
    });
    pin27.write(0 , function () {
        console.log("false on pin 27")
    });

    pin22.write(1 , function () {
        console.log("true on pin 22");
    });
    pin10.write(0 , function () {
        console.log("false on pin 10");
    });
}

function right() {

    //move right front wheel & left back wheel forward
    pin17.write(1,function () {
        console.log("true on pin17");
    });
    pin27.write(0 , function () {
        console.log("false on pin 27");
    });

    //move right front wheel & left back wheel backward
    pin10.write(1 , function () {
        console.log("true on pin 10")
    });
    pin22.write( 0 , function () {
        console.log("false on pin 22")
    });

}

function left() {

    //move left front wheel  & right back wheel forward




    pin22.write(1 , function () {
        console.log("false on pin 22")
    });
    pin10.write(0 , function () {
        console.log("true on pin 10")
    });

    //move left front wheel  & right back wheel backward
    pin27.write(1 , function () {
        console.log("false on pin 27");
    });
    pin17.write(0,function () {
        console.log("true on pin17");
    });


}
function stop() {
    pin17.write(0 , function () {
        console.log("stop the car pin17 false")
    });
    pin27.write(0 , function () {
        console.log("stop the car pin27 false")
    });
    pin22.write(0 , function () {
        console.log("stop the car pin22 false")
    });
    pin10.write(0 , function () {
        console.log("stop the car pin10 false")
    });
}

module.exports = {
    forward: forward,
    backward: backward,
    left: left,
    right: right,
    stop:stop
};
