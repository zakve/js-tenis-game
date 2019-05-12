var canvas;
var canvasContext;

var ballX = 50;
var ballSpeedX = 5;
var ballY = 50;
var ballSpeedY = 4;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

window.onload = function() {

    // game playground
    canvas = document.getElementById( "gameCanvas" );
    canvasContext = canvas.getContext( "2d" );

    let fps = 60;
    setInterval( () => {move(),draw()}, 1000/fps );

    canvas.addEventListener( 'mousemove', function( evt ) {
        let mousePos = calculateMousePos( evt );
        paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    } )
}

function move() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if ( ballX < 0 ) {
        // ballSpeedX = -ballSpeedX;
        if ( ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT ) {
            ballSpeedX = -ballSpeedX;
        }
        else {
            ballReset();
        }
    }
    if ( ballX > canvas.width ) {
        ballSpeedX = -ballSpeedX;
        // ballReset();
    }
    if ( ballY < 0 ) {
        ballSpeedY = -ballSpeedY;
    }
    if ( ballY > canvas.height ) {
        ballSpeedY = -ballSpeedY;
    }
}

function draw() {
    // black playground
    colorRect( 0, 0, canvas.width, canvas.height, "black" );
    // ball
    colorCircle( ballX, ballY, 10, "white" );
    // left player paddle
    colorRect( 0, paddle1Y, 10, PADDLE_HEIGHT, "white");
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc( centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function calculateMousePos( evt ) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}