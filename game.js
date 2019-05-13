var canvas;
var canvasContext;

var ballX = 50;
var ballSpeedX = 5;
var ballY = 50;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var gameOver = false;

var paddle1Y = 250;
var paddle2Y = 500;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

window.onload = function() {

    // game playground
    canvas = document.getElementById( "gameCanvas" );
    canvasContext = canvas.getContext( "2d" );

    // main functionality - draw and move in every moment
    let fps = 60;
    setInterval( () => {move(),draw()}, 1000/fps );

    // handle mouse move for player paddle
    canvas.addEventListener( 'mousemove', handleMouseMove);
    canvas.addEventListener( 'mousedown', handleMouseClick);
}

function move() {
    if (gameOver) 
        return;

    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if ( ballX < 0 ) {
        if ( ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT ) {
            ballSpeedX = -ballSpeedX;

            // change speed based on hit angle the paddle
            let deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player2Score++;
            ballReset();
        }
    }
    if ( ballX > canvas.width ) {
        if ( ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT ) {
            ballSpeedX = -ballSpeedX;

            // change speed based on hit angle the paddle
            let deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player1Score++;
            ballReset();
        }
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

    if (gameOver) {
        canvasContext.fillStyle = "white";

        if ( player1Score >= WINNING_SCORE ) {
            canvasContext.fillText("Left player Won!", 350, 200);
        } else if ( player2Score >= WINNING_SCORE ) {
            canvasContext.fillText("Right player Won!", 350, 200);;
        }

        canvasContext.fillText("Click to continue", 350, 500);
        return;
    }

    // net
    drawNet();

    // ball
    colorCircle( ballX, ballY, 10, "white" );

    // left player paddle
    colorRect( 0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
    // right player paddle
    colorRect( canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

    // score
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function drawNet() {
    for (let i = 0; i < canvas.height; i+=40) {
        colorRect( canvas.width/2-1, i, 2, 20, "white");
    }
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

function computerMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if ( paddle2YCenter < ballY-35 ) {
        paddle2Y += 3;
    }
    else if ( paddle2YCenter > ballY+35 ) {
        paddle2Y -= 3;
    }
}

function handleMouseClick( evt ) {
    if (gameOver) {
        player1Score = 0;
        player2Score = 0;
        gameOver = false;
    }
}

function handleMouseMove( evt ) {
    let mousePos = calculateMousePos( evt );
    paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
}

function ballReset() {
    if ( player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE ) {
        gameOver = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}