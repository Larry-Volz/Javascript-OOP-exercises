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
  constructor(p1, p2, HEIGHT = 6, WIDTH = 7) {
    this.players = [p1, p2];
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;

    this.PORTFOLIO = "https://larry-volz.github.io/Portfolio-for-Larry-Volz/";

    this.COLOR = ["", "red", "blue"]; //???TODO


    this.currPlayer = p1; // active player: 1 or 2


    this.winningFourXYs = [[]];

    this.makeBoard(); 
    this.makeHtmlBoard(); 
    // this.placeInTable();
    this.gameOver = false;


  }

  // makeBoard();  //*********************** WHY THROWS ERROR?  CAN'T CALL FUNCTIONS WITHIN CLASS??? */
  // makeHtmlBoard;

  // /** makeBoard: create in-JS board structure:
  //  *    board = array of rows, each row is array of cells  (board[y][x])
  //  */
  makeBoard() {
    this.board = []; // // array of rows, each row is array of cells  (board[y][x])
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column this.tops. */
  makeHtmlBoard() {
    const htmlBoard = document.querySelector("#board");

    // TODO: Create this.top row & listener
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");



    //************** IMPORTANT TO REVIEW ***************** */
    //HAVE TO BIND HERE SINCE IT IS GOING IN AN INSIDE METHOD
    this.handleGameClick = this.handleClick.bind(this);
    //************** IMPORTANT TO REVIEW ***************** */


    top.addEventListener("click", this.handleGameClick);    

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    htmlBoard.append(top);

    // Creates grid
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }

  //** findSpotForCol: given column x, return this.top empty y (null if filled) */
  findSpotForCol(x) {
    // finds the empty vertical slot for a given x value
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }


  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    // Makes a div and inserts into correct table cell
    const div = document.createElement("div");
    div.classList.add("piece");
    div.classList.add(`p${this.currPlayer}`);
    //----------------------------------------------- DO COLOR HERE! -------------
    // div.style.backgroundColor = COLOR[currPlayer-1];
    const cell = document.getElementById(`${y}-${x}`);
    // console.log("cell", cell);
    cell.append(div); //places piece in the form of a div inside a td
    console.log(`p${this.currPlayer} played ${y}-${x}`);

  }

  //functions to check for 4 in a row
  //returns an array of WHICH y,x coordinates to look at
  getHoriz(y, x) {
    return [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
  }
  getVert(y, x) {
    return [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
  }
  getDiagDR(y, x) {
    return [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
  }
  getDiagDL(y, x) {
    return [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  }


  /** endGame: announce game end */

  endGame(msg) {
    console.log("MADE IT TO ENDGAME()")
    //visually highlights the disks that are 4 in a row 
    for (let disk = 0; disk < 4; disk++) {
      y1 = winningFourXYs[disk][0];
      x1 = winningFourXYs[disk][1]
      let highlight = document.getElementById(`${y1}-${x1}`);
      highlight.classList.add(`p${this.currPlayer}Win`);

    }
    // Pops up winning alert message
    //used setTimeout because the alert was popping up before the screen had the chance
    //to re-draw the piece which was VERY unsatisfying to the players

    setTimeout(() => {
      let playAgain = confirm(msg);
      if (playAgain) { location.reload() }
      else (window.location.replace(PORTFOLIO));

    }, 2);
  }


  // // /* ---------------------------------- MAIN GAME LOOP from EventListener -----------------------------------------*/

  /** handleClick: handle click of column this.top to play piece */
  handleClick(evt) { // ********  <-- referred to as handleGameClick now via a bind() ********
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.placeInTable(y, x);

    // TODO: add line to update in-memory board
    this.board[y][x] = this.currPlayer;

    // check for win

    if (this.checkForWin()) {
      return endGame(`${this.COLOR[this.currPlayer].toUpperCase()} Wins!\nWant to play again?`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame ******************************


    // switch players
    // currPlayer 1 <-> 2
    if (this.currPlayer === 1) { this.currPlayer = 2 } else { this.currPlayer = 1 };
  }

  // /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    // Check four cells to see if they're all color of current player
    // cells: list of four (y, x) cells

    //  returns true IF ALL are legal coordinates...
    
    const _win = cells => {
      
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          // AND all match currPlayer (all the same color)
          this.board[y][x] === this.currPlayer
      );
    }

    //Create all the sequences of 4 on the board and make into arrays of coordinates
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        //for each column (x) check and see if there are 4 in a row horizontally
        //make each check into a 2d array
        let horiz = this.getHoriz(y, x);
        //then vertically
        let vert = this.getVert(y, x);
        //then for each diagonal direction
        let diagDR = this.getDiagDR(y, x);
        let diagDL = this.getDiagDL(y, x);



        //then send through _win to see if any of those are legal sequences of four
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          if (_win(horiz)) {
            console.log("HORIZONTAL WIN")
            winningFourXYs = this.getHoriz(y, x);
          } else if (_win(vert)) {
            console.log("VERTICAL WIN")
            winningFourXYs = this.getVert(y, x);
          } else if (_win(diagDR)) {
            console.log("DIAGONAL DR WIN")
            winningFourXYs = this.getDiagDR(y, x)
          } else {
            console.log("DIAGONAL DL WIN")
            winningFourXYs = this.getDiagDL(y, x);
          }
          //return true if a win
          return true;
        }
      }
    }
  }





}

let newGame = new Game(1, 2, 7, 8);

newGame.makeBoard();
newGame.makeHtmlBoard();







