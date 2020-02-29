var canvas = document.createElement('canvas');

setInterval(update, 1000 / 15);
setInterval(orangePosRandomizer, 5000);

canvas.width = 420;
canvas.height = 420;

document.body.appendChild(canvas);

document.addEventListener('keydown', keyPush);

var ctx = canvas.getContext('2d');

const rowSize = 20;
const colSize = 20;

const difficulties = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}
var difficulty = difficulties.MEDIUM;

const gameStates = {
  START: 'start',
  PLAYING: 'playing',
  DEATH: 'death'
}
var gameState = gameStates.START;

var dead;

// snake-----------------------
var snakePos;
var snakeDir;
var snakeTrail;
var snakeSize;

// fruit------------------------
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

// points----------------------------------------------------------------
var points = 0;

// STYLES----------------------------------------------------------------------
function setText(x, y) {
  ctx.fillStyle = 'white';
  ctx.font = '30px "Bangers", cursive'
  ctx.fillText('Press space to start', x, y);
}

function deathScreen() {
  ctx.fillStyle = 'red';
  ctx.font = '100px "Bangers", cursive'
  ctx.fillText('You lose', 50, 245);
}

// difficulty selector and button colors
document.getElementById('easy').addEventListener('click', function() {
  if (gameState != gameStates.PLAYING) {
    difficulty = difficulties.EASY;
    document.getElementById('easy').style.backgroundColor = 'yellow';
    document.getElementById('medium').style.backgroundColor = 'rgb(66, 165, 91)';
    document.getElementById('hard').style.backgroundColor = 'rgb(66, 165, 91)';
  }
});
document.getElementById('medium').addEventListener('click', function() {
  if (gameState != gameStates.PLAYING) {
    difficulty = difficulties.MEDIUM
    document.getElementById('easy').style.backgroundColor = 'rgb(66, 165, 91)';
    document.getElementById('medium').style.backgroundColor = 'yellow';
    document.getElementById('hard').style.backgroundColor = 'rgb(66, 165, 91)';
  }
});
document.getElementById('hard').addEventListener('click', function() {
  if (gameState != gameStates.PLAYING) {
    difficulty = difficulties.HARD;
    document.getElementById('easy').style.backgroundColor = 'rgb(66, 165, 91)';
    document.getElementById('medium').style.backgroundColor = 'rgb(66, 165, 91)';
    document.getElementById('hard').style.backgroundColor = 'yellow';
  }
});

// mouseover colors
document.getElementById('easy').addEventListener('mouseover', function() {
  document.getElementById('easy').style.backgroundColor = 'red';
});

document.getElementById('medium').addEventListener('mouseover', function() {
  document.getElementById('medium').style.backgroundColor = 'red';
});

document.getElementById('hard').addEventListener('mouseover', function() {
  document.getElementById('hard').style.backgroundColor = 'red';
});

// mouseout colors
document.getElementById('easy').addEventListener('mouseout', function() {
  if (difficulty == difficulties.EASY) {
    document.getElementById('easy').style.backgroundColor = 'yellow';
  } else {
    document.getElementById('easy').style.backgroundColor = 'rgb(66, 165, 91)';
  }
});

document.getElementById('medium').addEventListener('mouseout', function() {
  if (difficulty == difficulties.MEDIUM) {
    document.getElementById('medium').style.backgroundColor = 'yellow';
  } else {
    document.getElementById('medium').style.backgroundColor = 'rgb(66, 165, 91)';
  }
});

document.getElementById('hard').addEventListener('mouseout', function() {
  if (difficulty == difficulties.HARD) {
    document.getElementById('hard').style.backgroundColor = 'yellow';
  } else {
    document.getElementById('hard').style.backgroundColor = 'rgb(66, 165, 91)';
  }
});

//----------------------------------------------------------------------------------
function start() {
  gameState = gameStates.START;
  if (dead == true) {
    deathScreen();
    setText(100, 300);
  } else {
    setText(100, 220);
  }
}

function init() {
  points = 0;

  snakeDir = {
    x: 0,
    y: 0
  };

  if (difficulty != difficulties.HARD) {
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

// ----------------------------------------------------------------------
function update() {

  paintBg();

  switch (gameState) {
    case gameStates.START:
      if (difficulty == difficulties.MEDIUM) {
        paintWall(mapMedium);
      } else if (difficulty == difficulties.HARD) {
        paintWall(mapHard);
      }
      start();
      break;
    case gameStates.PLAYING: // playing state
      snakeMovement();
      paintSnake();

      if (difficulty == difficulties.MEDIUM) {
        paintWall(mapMedium);
        checkCollisionWall(mapMedium);
      } else if (difficulty == difficulties.HARD) {
        paintWall(mapHard);
        checkCollisionWall(mapHard);
      }

      paintFruit('red', applePos.x, applePos.y);
      paintFruit('orange', orangePos.x, orangePos.y);
      eatFruit('apple', applePos.x, applePos.y);
      eatFruit('orange', orangePos.x, orangePos.y);

      if (snakeDir.x != 0 || snakeDir.y != 0) {
        checkCollisionSnake();
      }
      break;
    case gameStates.DEATH:
      dead = true;
      start();
      break;
  }

  document.querySelector('.points').innerHTML = 'S c o r e :  ' + points;
}

// BACKGROUND----------------------------------------------------
function paintBg() {
  ctx.fillStyle = 'black';

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// SNAKE---------------------------------------------------------------
function paintSnake() {
  ctx.fillStyle = 'lime';

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
      gameState = gameStates.DEATH;
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

// FRUIT----------------------------------------------------------------------
function paintFruit(color, x, y) {
  ctx.fillStyle = color;

  ctx.fillRect(x, y, rowSize - 2, colSize - 2);
}

// check fruit position with walls
function checkFruitPos(map, fruit, x, y) {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map.length; j++) {
      if (map[i][j] == 1 && x / rowSize == i && y / colSize == j) {
        if (fruit == 'apple') {
          applePosRandomizer();
        } else if (fruit == 'orange') {
          orangePosRandomizer();
        }
      }
    }
  }
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

  if (difficulty == difficulties.MEDIUM) {
    checkFruitPos(mapMedium, 'apple', applePos.x, applePos.y);
  }

  if (difficulty == difficulties.HARD) {
    checkFruitPos(mapHard, 'apple', applePos.x, applePos.y);
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

  if (difficulty == difficulties.MEDIUM) {
    checkFruitPos(mapMedium, 'orange', orangePos.x, orangePos.y);
  }

  if (difficulty == difficulties.HARD) {
    checkFruitPos(mapHard, 'orange', orangePos.x, orangePos.y);
  }

  if (orangePos.x == applePos.x && orangePos.y == applePos.y) {
    orangePosRandomizer();
  }
}

function eatFruit(fruit, x, y) {
  if (snakePos.x == x / rowSize && snakePos.y == y / colSize) {
    if (fruit == 'apple') {
      points++;
      snakeSize++;
      applePosRandomizer();
    } else if (fruit == 'orange') {
      points += 5;
      snakeSize += 5;
      orangePosRandomizer();
    }
  }
}

// WALLS--------------------------------------------------------------------------------
function paintWall(map) {
  ctx.fillStyle = 'grey';
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map.length; j++) {
      if (map[i][j] == 1) {
        ctx.fillRect(i * rowSize, j * colSize, rowSize - 2, colSize - 2);
      }
    }
  }
}

function checkCollisionWall(map) {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map.length; j++) {
      if (map[i][j] == 1 && snakePos.x == i && snakePos.y == j) {
        gameState = gameStates.DEATH;
      }
    }
  }
}

// MOVEMENT----------------------------------------------------------------
// move with arrows or WASD
function keyPush(evt) {
  switch (evt.keyCode) {
    case 65: // A
    case 37: // LEFT
      if (snakeDir.x != 1) {
        snakeDir = {
          x: -1,
          y: 0
        };
      }
      break;
    case 87: // W
    case 38: // UP
      if (snakeDir.y != 1) {
        snakeDir = {
          x: 0,
          y: -1
        };
      }
      break;
    case 68: // D
    case 39: // RIGHT
      if (snakeDir.x != -1) {
        snakeDir = {
          x: 1,
          y: 0
        };
      }
      break;
    case 83: // S
    case 40: // DOWN
      if (snakeDir.y != -1) {
        snakeDir = {
          x: 0,
          y: 1
        };
      }
      break;
    case 32: // START GAME
      if (gameState == gameStates.START) {
        gameState = gameStates.PLAYING;
        init();
        dead = false;
      }
      break;
  }
}
