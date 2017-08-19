
const WALL = 'X';
const PASS = ' ';

class Maze {
  constructor(row, col) {
    // TODO: validate row and col. ODD!
    this.row = row;
    this.col = col
    this.wall = WALL;
    this.pass = PASS;

    this.board = new Array(row);

    for (let i = 0; i < row; i++) {
      this.board[i] = new Array(col);
      for (let j = 0; j < col; j++) {
        this.board[i][j] = WALL;
      }
    }
  }

  // Print the maze, for debugging purpose
  showboard() {
    let line = '';
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        line += `${this.board[i][j]}`;
      }
      line += '\n';
    }
    console.log(line);
  }

  // Implement Prim Algorithm
  generateMaze() {
    Math.seedrandom();

    let x = getOdd(this.row);
    let y = getOdd(this.col);
    console.log(`x: ${x}, y: ${y}`);
    let frontiers = [toFrontier(x, y, x, y)];

    while (frontiers.length != 0) {
      let randomFrontier = getRandom(frontiers.length);
      let frontier = frontiers[randomFrontier];
      frontiers[randomFrontier] = frontiers[frontiers.length - 1];
      frontiers.pop();

      if (this.board[frontier.dstX][frontier.dstY] === WALL) {
        this.board[frontier.srcX][frontier.srcY] = PASS;
        this.board[frontier.dstX][frontier.dstY] = PASS;

        let newFrontiers = getFrontiers(frontier.dstX, frontier.dstY, this.board);
        // console.log("new frontiers $$ " + JSON.stringify(frontiers));
        frontiers.push.apply(frontiers, newFrontiers);
      }
    }
    console.log("DONE");
  }
}

const isValid = function(x, y, board) {
  return x < board.length && x > -1 && y < board[0].length && y > -1;
}

const isBlocked = function(x, y, board) {
  return (board[x][y] === WALL);
}

const isFrontier = function(x, y, board) { // x is dstX, y is dstY
  return isValid(x, y, board) && isBlocked(x, y, board);
}

// data structure Frontier is a two cell vector(direction matters)
const toFrontier = function(srcX, srcY, dstX, dstY) {
  return {
    srcX: srcX,
    srcY: srcY,
    dstX: dstX,
    dstY: dstY,
  };
}

const getRandom = function(range) {
  return Math.floor(Math.random() * range);
}

const getOdd = function(range) {
  let random = Math.floor(Math.random() * range);

  return (random % 2 === 0) ?
      (random === 0 ? random + 1 : random - 1) : random;
}

// the way to cut the loop in maze.
const getFrontiers = function(x, y, board) {
  let res = [];
  if (isFrontier(x - 2, y, board)) res.push(toFrontier(x - 1, y, x - 2, y));
  if (isFrontier(x, y - 2, board)) res.push(toFrontier(x, y - 1, x, y - 2));
  if (isFrontier(x + 2, y, board)) res.push(toFrontier(x + 1, y, x + 2, y));
  if (isFrontier(x, y + 2, board)) res.push(toFrontier(x, y + 1, x, y + 2));
  return res;
}
