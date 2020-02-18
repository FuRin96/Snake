var canvas = document.createElement("canvas");
setInterval(update, 1000 / 15);
setInterval(orangePosRandomizer, 5000);

canvas.width = 420;
canvas.height = 420;

document.body.appendChild(canvas);

document.addEventListener("keydown", keyPush);

var ctx = canvas.getContext("2d");

const rowSize = 20;
const colSize = 20;

var difficulty = 'medium'; // 'easy' 'medium' 'hard'
var gameState; // 'start' 'playing' 'death'
var dead;

// snake-----------------------
var snakePos;
var snakeDir;
var snakeTrail;
var snakeSize;

// apple------------------------
var applePos;

var orangePos;

// maps-------------------------
var mapMedium = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var mapHard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// points-----------------------
var points = 0;

// STYLES----------------------------------------------------------------------
function setText() {
  ctx.fillStyle = 'white';
  ctx.font = "20px 'Montserrat', sans-serif"
  ctx.fillText('Press space to start', 125, 210);
}

function deathScreen() {
  ctx.fillStyle = 'red';
  ctx.font = "100px 'Montserrat', sans-serif"
  ctx.fillText('You lose', 20, 230);
}

// difficulty selector
document.getElementById("easy").addEventListener("click", easyMode);
document.getElementById("medium").addEventListener("click", mediumMode);
document.getElementById("hard").addEventListener("click", hardMode);

//----------------------------------------------------------------------------------

function start() {
  gameState = 'start';
  if (dead == true) {
    deathScreen();
  } else {
    setText();
  }
}

start();

function init() {
  points = 0;

  snakeDir = {
    x: 0,
    y: 0
  };

  if (difficulty != 'hard') {
    snakePos = {
      x: 10,
      y: 10
    };
  } else {
    snakePos = {
      x: 5,
      y: 5
    };
  }
  snakeTrail = [];

  snakeSize = 5;

  applePosRandomizer();
  orangePosRandomizer();
}

function update() {

  // check buttons when difficulty selected
  if (difficulty == 'easy') {
    document.getElementById("easy").style.backgroundColor = "yellow";
  } else {
    document.getElementById("easy").style.backgroundColor = "rgb(66, 165, 91)";
  }

  if (difficulty == 'medium') {
    document.getElementById("medium").style.backgroundColor = "yellow";
  } else {
    document.getElementById("medium").style.backgroundColor = "rgb(66, 165, 91)";
  }

  if (difficulty == 'hard') {
    document.getElementById("hard").style.backgroundColor = "yellow";
  } else {
    document.getElementById("hard").style.backgroundColor = "rgb(66, 165, 91)";
  }

  paintBg();

  switch (gameState) {
    case 'start':
      if (difficulty != 'easy') {
        paintWall();
      }
      start();
      break;
    case 'playing': // playing state
      paintSnake();

      if (difficulty != 'easy') {
        createWalls();
      }
      paintApple();
      paintOrange();
      snakeMovement();
      eatApple();
      eatOrange();

      if (snakeDir.x != 0 || snakeDir.y != 0) {
        checkCollisionSnake();
      }
      break;
    case 'death':
      start();
      break;
  }

  document.querySelector('.points').innerHTML = 'S c o r e :  ' + points;
}

// BACKGROUND----------------------------------------------------
function paintBg() {
  ctx.fillStyle = "black";

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// SNAKE---------------------------------------------------------------
function paintSnake() {
  ctx.fillStyle = "lime";

  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(snakeTrail[i].x * rowSize, snakeTrail[i].y * colSize, rowSize - 2, colSize - 2);
  }

  if (snakeTrail.length == snakeSize) {
    snakeTrail.shift();
  }
}

// check snake collision with itself
function checkCollisionSnake() {
  for (var i = 0; i < snakeTrail.length - 2; i++) {
    if (snakeTrail[snakeTrail.length - 1].x == snakeTrail[i].x && snakeTrail[snakeTrail.length - 1].y == snakeTrail[i]
      .y) {
      gameState = 'death';
      dead = true;
    }
  }
}

function snakeMovement() {
  snakePos.x += snakeDir.x;
  snakePos.y += snakeDir.y;

  if (snakePos.x >= 21) {
    snakePos.x = 0;
  } else if (snakePos.x < 0) {
    snakePos.x = 20;
  }

  if (snakePos.y >= 21) {
    snakePos.y = 0;
  } else if (snakePos.y < 0) {
    snakePos.y = 20;
  }

  snakeTrail.push({
    x: snakePos.x,
    y: snakePos.y
  });
}

// APPLE----------------------------------------------------------------------
function paintApple() {
  ctx.fillStyle = "red";

  ctx.fillRect(applePos.x, applePos.y, rowSize - 2, colSize - 2);
}

function paintOrange() {
  ctx.fillStyle = "orange";

  ctx.fillRect(orangePos.x, orangePos.y, rowSize - 2, colSize - 2);
}

function applePosRandomizer() {
  applePos = {
    x: Math.floor(Math.random() * (canvas.width / rowSize)) * rowSize,
    y: Math.floor(Math.random() * (canvas.height / colSize)) * colSize
  }

  for (var i = 0; i < snakeTrail.length; i++) {
    if (applePos.x / rowSize == snakeTrail[i].x && applePos.y / colSize == snakeTrail[i].y) {
      applePosRandomizer();
    }
  }

  if (difficulty == 'medium') {
    for (var i = 0; i < mapMedium.length; i++) {
      for (var j = 0; j < mapMedium.length; j++) {
        if (mapMedium[i][j] == 1 && applePos.x / rowSize == i && applePos.y / colSize == j) {
          applePosRandomizer();
        }
      }
    }
  }

  if (difficulty == 'hard') {
    for (var i = 0; i < mapHard.length; i++) {
      for (var j = 0; j < mapHard.length; j++) {
        if (mapHard[i][j] == 1 && applePos.x / rowSize == i && applePos.y / colSize == j) {
          applePosRandomizer();
        }
      }
    }
  }
}

function orangePosRandomizer() {
  orangePos = {
    x: Math.floor(Math.random() * (canvas.width / rowSize)) * rowSize,
    y: Math.floor(Math.random() * (canvas.height / colSize)) * colSize
  }

  for (var i = 0; i < snakeTrail.length; i++) {
    if (orangePos.x / rowSize == snakeTrail[i].x && orangePos.y / colSize == snakeTrail[i].y) {
      orangePosRandomizer();
    }
  }

  if (difficulty == 'medium') {
    for (var i = 0; i < mapMedium.length; i++) {
      for (var j = 0; j < mapMedium.length; j++) {
        if (mapMedium[i][j] == 1 && orangePos.x / rowSize == i && orangePos.y / colSize == j) {
          orangePosRandomizer();
        }
      }
    }
  }

  if (difficulty == 'hard') {
    for (var i = 0; i < mapHard.length; i++) {
      for (var j = 0; j < mapHard.length; j++) {
        if (mapHard[i][j] == 1 && orangePos.x / rowSize == i && orangePos.y / colSize == j) {
          orangePosRandomizer();
        }
      }
    }
  }
}


function eatApple() {
  if (snakePos.x == applePos.x / rowSize && snakePos.y == applePos.y / colSize) {
    points++;
    snakeSize++;
    applePosRandomizer();
  }
}

function eatOrange() {
  if (snakePos.x == orangePos.x / rowSize && snakePos.y == orangePos.y / colSize) {
    points += 5;
    snakeSize += 5;
    orangePosRandomizer();
  }
}

// MODES--------------------------------------------------------------------------------
function easyMode() {
  if (gameState != 'playing')
    difficulty = 'easy';
}

function mediumMode() {
  if (gameState != 'playing')
    difficulty = 'medium';
}

function hardMode() {
  if (gameState != 'playing')
    difficulty = 'hard';
}

// WALLS--------------------------------------------------------------------------------
function createWalls() {
  paintWall();
  checkCollisionWall();
}

function paintWall() {
  ctx.fillStyle = "grey";
  if (difficulty == 'medium') {
    for (var i = 0; i < mapMedium.length; i++) {
      for (var j = 0; j < mapMedium.length; j++) {
        if (mapMedium[i][j] == 1) {
          ctx.fillRect(i * rowSize, j * colSize, rowSize - 2, colSize - 2);
        }
      }
    }
  }
  if (difficulty == 'hard') {
    for (var i = 0; i < mapHard.length; i++) {
      for (var j = 0; j < mapHard.length; j++) {
        if (mapHard[i][j] == 1) {
          ctx.fillRect(i * rowSize, j * colSize, rowSize - 2, colSize - 2);
        }
      }
    }
  }
}

function checkCollisionWall() {
  if (difficulty == 'medium') {
    for (var i = 0; i < mapMedium.length; i++) {
      for (var j = 0; j < mapMedium.length; j++) {
        if (mapMedium[i][j] == 1 && snakePos.x == i && snakePos.y == j) {
          gameState = 'death';
          dead = true;
        }
      }
    }
  }

  if (difficulty == 'hard') {
    for (var i = 0; i < mapHard.length; i++) {
      for (var j = 0; j < mapHard.length; j++) {
        if (mapHard[i][j] == 1 && snakePos.x == i && snakePos.y == j) {
          gameState = 'death';
          dead = true;
        }
      }
    }
  }
}

// MOVEMENT----------------------------------------------------------------
function keyPush(evt) {
  console.log({
    "Tecla pulsada: ": evt.keyCode
  });

  switch (evt.keyCode) {
    case 65:
    case 37: // LEFT
      if (snakeDir.x != 1) {
        snakeDir = {
          x: -1,
          y: 0
        };
      }
      break;
    case 87:
    case 38: // UP
      if (snakeDir.y != 1) {
        snakeDir = {
          x: 0,
          y: -1
        };
      }
      break;
    case 68:
    case 39: // RIGHT
      if (snakeDir.x != -1) {
        snakeDir = {
          x: 1,
          y: 0
        };
      }
      break;
    case 83:
    case 40: // DOWN
      if (snakeDir.y != -1) {
        snakeDir = {
          x: 0,
          y: 1
        };
      }
      break;
    case 32: // START GAME
      if (gameState == 'start') {
        gameState = 'playing';
        init();
        dead = false;
      }
      break;
  }
}
