//Variables de la pagina de inicio
const titleText = document.getElementById("name-game");
const startScreen = document.getElementById("start-screen");
const musicPlay = document.getElementById("background-music");

//Clock-Time

//

///..........

const SecondScreen = document.querySelector("#gameContainer");
const gameBoard = document.querySelector("#gameBoard"); //tablero de juego
const ctx = gameBoard.getContext("2d"); //lo que se dibuje an el pizarra
const scoreText = document.querySelector("#scoreText"); // que es el texto
const resetBtn = document.querySelector("#resetBtn"); //boton de reset
const gameWidth = gameBoard.width; //ancho del juego
const gameHeight = gameBoard.height; //alto del juego

//colores de los objetos

const diagramBackground = new Image(); //background del fondo
diagramBackground.src = "diagram-board.jpg";
const paddle1Color = "black"; //paddle 1
const paddle2Color = "balck"; //paddle 2
const paddleBorder = "black";
const ballColor = "balck";
const ballBorderColor = "white";
const ballRadius = 12.5;
const paddleSpeed = 100;

let intervalID;

//variable reloj

let clockInterval;

//velocidad de la pelota

let ballSpeed = 100;

//pone la pelota en el centro del tablero
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;

//direccion en la que se dirige la bola
let ballXDirection = 0;
let ballYDirection = 0;

//puntuaciones de cada jugador
let player1Score = 0;
let player2Score = 0;

//OBJETOS decada paddle 1

let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};

//Imagen board
let diagramImageX = gameWidth;
let diagramImageY = gameWidth;

//setup de paddle 2
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

//evento de teclas presionadas del teclado
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
document.addEventListener("DOMContentLoaded", music);
document.addEventListener("click", startBtn);
document.addEventListener("click", pausedMusic);
//ClockTime
document.getElementById("clock").textContent = `${minutes}:${seconds}`;

document.getElementById("start").addEventListerner("click", startTime);
document.getElementById("reset").addEventListener("click", resetTime);

//

//se declaran funciones aqui son las acciones

gameStart();

// funcion reloj

function startTime() {
  clearInterval(clockInterval);
  clockInterval = setInterval(showCurrentTime, 1000);
}

function resetTime() {
  clearInterval(clockInterval);
  document.getElementById("clock").textContent = "00:00";
}

//

function showCurrentTime() {
  const currentTime = new Date();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
}

minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

//funcion board diagram
function clearBoard() {
  ctx.drawImage(diagramBackground, 0, 0, diagramImageX, diagramImageY);
}

//FUNCION DE MUSICA

function music() {
  musicPlay.play();
}

//console.log(music);
//.........//

function startBtn() {
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
}

function pausedMusic() {
  musicPause.pause();
}

function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}

function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle1.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall() {
  ballSpeed = 1;

  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }

  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall() {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }

  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  //console.log(keyPressed);
  const paddle1Up = 69; //e
  const paddle1Down = 83; //s
  const paddle2Up = 80; //p
  const paddle2Down = 76; //l;

  switch (keyPressed) {
    /// key E (89)

    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }

      break;

    //Key S (63)

    case paddle1Down:
      if (paddle1.y < gameHeight + paddle1.height) {
        paddle1.y += paddleSpeed;
      }

      break;

    //Key P (80)

    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }

      break;

    //Key L (75)

    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }

      break;
  }

  console.log(keyPressed);
}

function updateScore() {
  scoreText.textContent = `${player1Score}:${player2Score}`;
}
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };

  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };

  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
}

///MUSICA DE INICIO

const backBoard = document.querySelector(".diagram"); // Selecciona el elemento
board.style.backgroundImage = backBoard; // Asigna la imagen como fondo
board.style.backgroundSize = "cover"; // Asegura que la imagen cubra todo
board.style.backgroundPosition = "center"; // Centra la imagen
board.style.backgroundRepeat = "repeat"; // Evita la repetición
