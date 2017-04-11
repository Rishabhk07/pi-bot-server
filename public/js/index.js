/**
 * Created by rishabhkhanna on 23/03/17.
 */


var height;
var width;
var circlePosition;
var circle;

$(function () {
    circle = $('.circle');
     circlePosition = circle.offset();
    var xPos;
    var yPos;
    height = $(window).height();
    width = $(window).width();

    console.log(height + " " + width);

    var socket = io();
    console.log("js called");
    socket.on("connection" , function (data) {
        console.log(data);
    });
    socket.on("car", function (data) {
        var json = JSON.parse(data);
        xPos = json.accelX;
        yPos = json.accelY;
        console.log(xPos + " " + yPos );
        setPosition(xPos , yPos);
    });
    socket.on("data" , function (data) {
        console.log(data);
    });

});

function setPosition(xPos, yPos ) {

    if(xPos > width-100){
        xPos = width-100
    }else if(xPos < 0){
        xPos = 0;
    }

    if(yPos > height-100){
        yPos = height-100
    }else if(yPos < 0){
        yPos = 0;
    }



    circle.css({top: yPos , left : xPos})



}
