let STEP = 10;
let GAME_OVER = false;

// --------------------------------------------------------------------------
drawBoard = function(maze) {
  maze.generateMaze();

  ctx.beginPath();
  ctx.fillStyle = 'black';
  // draw the board
  let board = maze.board;
  for (let i = 0; i < maze.row; i++) {
    for (let j = 0; j < maze.col; j++) {
      if (maze.board[i][j] === maze.wall) {
        ctx.rect(j * STEP, i * STEP, STEP, STEP);
        ctx.fill();
      }
    }
  }
  ctx.fillStyle = 'red';
  ctx.closePath();
}

draw = function() {
  // draw the player
  ctx.beginPath();
  ctx.rect(x * STEP, y * STEP, STEP, STEP);
  ctx.fill();
  ctx.closePath();
}

clear = function() {
  ctx.clearRect(x * STEP, y * STEP, STEP, STEP);
}

handleKey = function(evt) {
  if (y === maze.row - 2 && x === maze.col - 2) {
    GAME_OVER = true;
    alert("OVER");
  }
  switch (evt.keyCode) {
    case 38: // up
      if (y - 1 > 0 && maze.board[y - 1][x] === maze.pass) y -= 1;
      break;
    case 40: // down
      if (y + 1 < maze.row - 1 && maze.board[y + 1][x] === maze.pass) y += 1;
      break;
    case 37: // left
      if (x - 1 > 0 && maze.board[y][x - 1] === maze.pass) x -= 1;
      break;
    case 39: // right
      if (x + 1 < maze.col - 1 && maze.board[y][x + 1] === maze.pass) x += 1;
      break;
  }
}

document.addEventListener('keydown', (evt) => {
  clear();
  handleKey(evt);
  draw();
});

// --------------------------------------------------------------------------
let canvas = document.getElementById("canvas"); // init canvas
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let WIDTH = 35;
let HEIGHT = 21;

let x = 1;
let y = 1;

let maze = new Maze(WIDTH, HEIGHT); // create a maze
drawBoard(maze);
draw();
