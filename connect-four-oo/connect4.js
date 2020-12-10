/*

REFACTORED TO OOP
- Game Class
  - functions into methods
- player classes

IMPROVEMENTS TO ORIGINAL
- Used setTimeout for a few microseconds delay to fix winning subroutine to place piece FIRST so player can SEE 
the four in a row before the win sequence
- Used a reversed gradient to highlight the winning pieces
  - refactored the code to check for 4 in a row into functions so I could use them to acces the coordinates 
  needed to visually highlight the win
  - used set interval to increase/decrease size and transition in CSS to make it smooth
  - Do Play again prompt refresh to restart the game (on no go to my portfolio)
- make table responsive for smaller devices
- create animation subroutine for dropping pieces
*/

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


class Game {
  constructor ( HEIGHT, WIDTH ) {
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;

    this.PORTFOLIO = "https://larry-volz.github.io/Portfolio-for-Larry-Volz/";
    this.COLOR = ["","red", "blue"];


    let currPlayer = 1; // active player: 1 or 2
    this.board = []; // array of rows, each row is array of cells  (board[y][x])

    this.winningFour = [[]];

    this.makeBoard(); //??? Why???
    this.makeHtmlBoard(); //??? Why???


  }
    
  // makeBoard();  //*********************** WHY THROWS ERROR?  CAN'T CALL FUNCTIONS WITHIN CLASS??? */
  // makeHtmlBoard;

  // /** makeBoard: create in-JS board structure:
  //  *    board = array of rows, each row is array of cells  (board[y][x])
  //  */
  makeBoard() {
  this.board = []; //starts off blank 
  for (let y = 0; y < this.HEIGHT; y++) {
    this.board.push(Array.from({ length: this.WIDTH }));
  }
}

  /** makeHtmlBoard: make HTML table and row of column this.tops. */
  makeHtmlBoard() {
    let htmlBoard = document.querySelector("#board");
  
    // TODO: Create this.top row & listener
    let top = document.createElement("tr");
    top.setAttribute("id", "column-top");
  
    top.addEventListener("click", () => {
      handleClick(this.makeHtmlBoard)    //******************ERROR HERE ********** */
    });  //will I need to bind here? ***************************
  
    for (this.x = 0; this.x < this.WIDTH; this.x++) {
      let headCell = document.createElement("td");
      headCell.setAttribute("id", this.x);
      top.append(this.headCell);
    }
    htmlBoard.append(this.top);
  
    // Creates grid
    for (this.y = 0; this.y < this.HEIGHT; this.y++) {
      this.row = document.createElement("tr");
      for (this.x = 0; this.x < this.WIDTH; this.x++) {
        this.cell = document.createElement("td");
        this.cell.setAttribute("id", `${this.y}-${this.x}`);
        this.row.append(this.cell);
      }
      this.htmlBoard.append(this.row);
    }
  }

//** findSpotForCol: given column x, return this.top empty y (null if filled) */
findSpotForCol(x) {
  // finds the empty vertical slot for a given x value
  for (this.y = this.HEIGHT-1; this.y >= 0; this.y--) {
    if (!this.board[this.y][this.x]) return this.y;
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

placeInTable(y, x) {
  // Makes a div and inserts into correct table cell
  this.div = document.createElement("div");
  this.div.classList.add("piece");
  this.div.classList.add(`p${this.currPlayer}`);
  // div.style.backgroundColor = COLOR[currPlayer-1];
  this.cell = document.getElementById(`${this.y}-${this.x}`);
  cell.append(this.div);
  console.log(`p${this.currPlayer} played ${this.y}-${this.x}`);

}

//functions to check for 4 in a row

getHoriz(y, x) { 
  [[this.y, this.x], [this.y, this.x + 1], [this.y, this.x + 2], [this.y, this.x + 3]];
}
getVert(y,x) { 
  [[this.y, this.x], [this.y + 1, this.x], [this.y + 2, this.x], [this.y + 3, this.x]];
}
getDiagDR (y,x) {
  [[this.y, this.x], [this.y + 1, this.x + 1], [this.y + 2, this.x + 2], [this.y + 3, this.x + 3]];
}
getDiagDL(y,x) {
  [[this.y, this.x], [this.y + 1, this.x - 1], [this.y + 2, this.x - 2], [this.y + 3, this.x - 3]];
}


/** endGame: announce game end */

endGame(msg) {

  //visually highlights the disks that are 4 in a row 
  for (this.disk = 0; this.disk < 4; this.disk++) {
    this.y1 = this.winningFour[this.disk][0];
    this.x1 = this.winningFour[this.disk][1]
    this.highlight = document.getElementById(`${this.y1}-${this.x1}`);
    this.highlight.classList.add(`p${this.currPlayer}Win`);

  }
  // Pops up winning alert message
  //used setTimeout because the alert was popping up before the screen had the chance
  //to re-draw the piece which was VERY unsatisfying to the players
  
  setTimeout(() => {
    this.playAgain = confirm(this.msg);
    if(this.playAgain) {location.reload()}
    else (window.location.replace(this.PORTFOLIO));
    
  }, 2);
}


// // /* ---------------------------------- MAIN GAME LOOP from EventListener -----------------------------------------*/

/** handleClick: handle click of column this.top to play piece */
 handleClick(evt) { //---------------------------- ERROR SAYS THIS IS NOT DEFINED - A THIS THING ------
  // get x from ID of clicked cell
  this.x = +this.evt.target.id;

  // get next spot in column (if none, ignore click)
  this.y = this.findSpotForCol(this.x);
  if (this.y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(this.y, this.x);

  // TODO: add line to update in-memory board
  this.board[this.y][this.x] = this.currPlayer;

  // check for win

  if (this.checkForWin()) {
    return endGame(`${this.COLOR[this.currPlayer].toUpperCase()} Wins!\nWant to play again?`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame ******************************


  // switch players
  // currPlayer 1 <-> 2
  if (this.currPlayer === 1) { this.currPlayer = 2} else { this.currPlayer = 1};
}

// /** checkForWin: check board cell-by-cell for "does a win start here?" */

checkForWin() {
  function _win (cells) {  
    // Check four cells to see if they're all color of current player
    // cells: list of four (y, x) cells

    //  returns true IF ALL are legal coordinates...
    return cells.every(               //**************************BIND?  CALL? **************************** */
      function([y, x]) {
        this.y >= 0 &&
        this.y < this.HEIGHT &&
        this.x >= 0 &&
        this.x < this.WIDTH &&
        // AND all match currPlayer (all the same color)
        this.board[this.y][this.x] === this.currPlayer
      }
    );
  }

  //Create all the sequences of 4 on the board and make into arrays of coordinates
  for (this.y = 0; this.y < this.HEIGHT; this.y++) {
    for (this.x = 0; this.x < WIDTH; this.x++) {
      //for each column (x) check and see if there are 4 in a row horizontally
      //make each check into a 2d array
      this.horiz = this.getHoriz(this.y, this.x);
      //then vertically
      this.vert = this.getVert(this.y, this.x);
      
      //then for each diagonal direction
      this.diagDR = this.getDiagDR(this.y, this.x);
      this.diagDL = this.getDiagDL(this.y, this.x);
      


      //then send through _win to see if any of those are legal sequences of four
      if (this._win(this.horiz) || this._win(this.vert) || this._win(this.diagDR) || this._win(this.diagDL)) {
        if (this._win(this.horiz)) {
          this.winningFour = this.getHoriz(this.y, this.x);
        } else if (this._win(this.vert)){
          this.winningFour = this.getVert(this.y, this.x);
        } else if (this._win(this.diagDR)){
          this.winningFour = this.getDiagDR(this.y, this.x)
        } else {
          this.winningFour = this.getDiagDL(this.y, this.x);
        }
        //return true if a win
        return true;
      }
    }
  }
}





}

let newGame = new Game(7,8);

newGame.makeBoard();
newGame.makeHtmlBoard();







