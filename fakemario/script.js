var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var myAudio = document.createElement("audio");
myAudio.src = "Water_World.mp3";

var gus = new Image();
var bg = new Image();
var brick = new Image();

gus.src = "amogus.png";
bg.src = "bg.png";
brick.src = "brick.png";

var gusX = 0;
var gusY = 415;

var brickX = 150;
var brickY = 380;

var grav = 2.5;

document.addEventListener("keydown", function(event){
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        moveLeft();
    }
})

document.addEventListener("keydown", function(event){
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        moveRight();
    }
})

document.addEventListener("keydown", function(event) {
    if (event.code == "KeyW" || event.code == "ArrowUp") {
        
    }
})

function jump() {
    if (gusY >= 415) {
        gusY -= 200;
    }
    else {
        console.log("NO!")
    }
}

function moveLeft() {
    gusX -= 5;
    if (gusX < 0) {
        gusX += 10
    }
    
}

function moveRight() {
    gusX += 5;
    if (gusX > 650) {
        gusX -= 10;
    }
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(gus, gusX, gusY);
    //ctx.drawImage(brick, brickX, brickY);

    gusY += grav;
    if (gusY > 415) {
        gusY -= 5
    }

    requestAnimationFrame(draw);
}

gus.onload = draw;
bg.onload = draw;