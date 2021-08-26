"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() { 
  //CODEREVIEW: change i and j to 'y' and 'x' to make it easier and keep it consistent
  //CODEREVIEW: when looping over something bigger than "just a loop", good to go beyond 'i and j'
  for (let i = 0; i < HEIGHT; i++) {
    const rowArr = []; //CODEREVIEW: change rowArr to something more clear. rowArr sounds like 'array of rows'
    for (let j = 0; j < WIDTH; j++) {
    //CODEREVIEW: [] is a truthy thing, and here it would be better to have a falsey thing, like 0, null, undefined  
      rowArr.push([]);
    }

    board.push(rowArr);
  }

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: Creating table row for user input, equal to width of board set up attribute, plus event listener, gives functionality to column when clicked on

  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: Looping through WIDTH, creating table cells for table row, appending to the top
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      // TODO: append the table cell to the table row
      let cell = document.createElement("td");
      //CODEREVIEW: Make the id explicitely a string rather than have javascript convert it to a string
      //CODEREVIEW: Good spot for a string interpolation
      cell.setAttribute("id", [y, x]);
      //CODEREVIEW: Good option to call "htmlRow" to avoid ambiguity with previous 'row' variable
      row.append(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  console.log("x=",x);
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    console.log("y=",y);
    console.log("board[y][x]",board[y][x]);
     if (board[y][x].length === 0) {
       return y;
     }
  } 
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");

  //CODEREVIEW: Look at style guide for good uses vs bad uses of terniary
  //CODEREVIEW: better use of terniary - piece.classList.add(currPlayer === 1 ? "player1" : "player2")
  currPlayer === 1
    ? piece.classList.add("player1")
    : piece.classList.add("player2");

  //CODEREVIEW: Making the id more explicitly a string makes it easier to debug
    const selectedCell = document.getElementById([y, x]);
  selectedCell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x].push(currPlayer);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const checkForTie = board.every(item => item !== null);

  if (checkForTie) {
    endGame();
  }


// switch players
currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
