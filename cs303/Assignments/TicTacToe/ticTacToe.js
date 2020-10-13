/* eslint-disable id-length */
"use strict";
{

  /** Get Element By Id
  * @param {String} id - Element HTML Id
  * @returns {Object} - Element
  */
  let element = function (id) {
    return document.getElementById(id);
  };

  document.getElementById("gameEnd").hidden = true;

let boardSizeX = 2; //Starts at 0
let boardSizeY = 2; //Starts at 0
let gameBoard;
let cellsLinedUpToWin = 3;
// let moves = []; // Player 1/2 [row, column]
let cellIndenty = "character"; // color

//////////////////////////////////////////////////////////
// let winners = [];
let player1Selections = [];
let player2Selections = [];
// let timer;
// let numberOfPlayers = 2;
let currentPlayer = 1;
// let move = 0;
let points1 = 0;    // player 1 points
let points2 = 0;    // player 2 points
// let size = 3;

/** Draw Board
 * @returns {undefined} 
 */
let drawBoard = function () {
    gameBoard = document.getElementById("game");
    let counter = 1;
    
    while (gameBoard.hasChildNodes()) {
      gameBoard.removeChild(gameBoard.firstChild);
    }

    for (let s = 0; s <= boardSizeY; s++) {
        let row = document.createElement("tr");
        
        for (let r = 0; r <= boardSizeX; r++) {
            let col = document.createElement("td");
            col.id = counter;

            /**
             * @param {Object} e Event
             * @returns {undefined} 
             */
            let handler = function(e) {

              let lastMove = e.target;

                if (currentPlayer == 1) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b;});
                    element("player1").classList.remove("selected");
                    element("player2").classList.add("selected");
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b;});
                    element("player1").classList.add("selected");
                    element("player2").classList.remove("selected");
                }
                
                let winFound = getWinningArray(lastMove);

                if (winFound) {

                    colorBoard(winFound);

                    // Click Here to Play Again 
                    let winner = element("gameEnd");

                    let winPlayer = "Player " + element("player" + currentPlayer + "name").firstChild.nodeValue + " Wins!!!";
                    winner.firstChild.nodeValue =  winPlayer + " Click Here to Play Again";
                    
                    // Display Winner for 5 Seconds 
                    let timerDisplay = element("timer");
                    timerDisplay.firstChild.nodeValue = winPlayer;
                    timerDisplay.style.display = "";
                    setTimeout(function(){timerDisplay.style.display = "none";},5000);

                    
                    winner.hidden = false;

                    if(currentPlayer == 1)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    // Remove Remaining Event Handlers
                    let td = gameBoard.getElementsByTagName("td");
                    for (let i = 0; i < td.length; i += 1) {
                      // el.removeEventListener("click", handler, false);
                       td[i].onclick = null;
                    }

                }

                else if (player2Selections.length + player1Selections.length === ((boardSizeX + 1) * (boardSizeY + 1)))
                {
                    // Draw
                    let winner = element("gameEnd");
                    winner.firstChild.nodeValue = "Draw! Click Here to Play Again";
                    winner.hidden = false;
                    
                }
                else {

                    // Next Players Turn
                    currentPlayer = currentPlayer === 1 ? 2 : 1;

                    // Remove Click Event for Cell
                    //  elmt.removeEventListener("click", handler, false);
                    lastMove.onclick = null;
                }
            };

            //  col.addEventListener("click", handler, false);
            col.onclick =handler;
     

            row.appendChild(col);
            counter++;
        }

        gameBoard.appendChild(row);
    }

    element("currentSettings").firstChild.nodeValue = (boardSizeX + 1) + 
    " x " + (boardSizeY + 1) + " Board. Need " + cellsLinedUpToWin + " Cells in a Row to Win.";

};



/** Reset Board
 * @returns {undefined} 
 */
let reset = function () {
    currentPlayer = 1;
    player1Selections = new Array();
    player2Selections = new Array();
    element("player1").classList.add("selected");
    element("player2").classList.remove("selected");
    element("gameEnd").hidden = "true";
    element("timer").style.display = "none";
};


// window.addEventListener("load", drawBoard);
drawBoard();










  /** Check for Winner
   * @param  {Object} cellClicked - Cell Just Picked
   * @returns {Number[]} Winning Array [row, col] or Undefined for No Winner
   */
  let getWinningArray = function (cellClicked) {

      // Get Identification & Location
    let id = cellClicked.firstChild.nodeValue;
    let colStart = cellClicked.cellIndex;
    let rowStart = cellClicked.parentElement.rowIndex;

    let aryCheck = [
    [[1, 0], [-1, 0]],  // Check Horizontally
    [[0, 1], [0, -1]],  // Check Vertically
    [[1, 1], [-1, -1]], // Check Right Diaginal
    [[1, -1], [-1, 1]]  // Check Left Diaginal
    ];

    // Check Board for Win
    for (let n of aryCheck) {
      let result = [[rowStart, colStart]];
      n.forEach((x)=>checkBoardForMatch(id, rowStart, colStart, x[0], x[1], result));
      if (result.length >= cellsLinedUpToWin) return result; // Win
    }
  };


  /** Colors Board Cells for Winner
   * @param  {Number[]} aryCells Array of Cells [row, col]
   * @returns {undefined} undefined
   */
  let colorBoard = function (aryCells) {

    for (let x of aryCells) {
    //   gameBoard.children[x[0]].children[x[1]].classList.add("winnerShading");
      gameBoard.children[x[0]].children[x[1]].style.background = "RGB(0, 255, 255)";
    }

  };


  /** Check Board for Winning Match for Last Move
   * @param  {String} value String to Match
   * @param  {Number} row Start Row
   * @param  {Number} column Start Column
   * @param  {Number} xMove Move in X Direction
   * @param  {Number} yMove Move in Y Direction
   * @param  {Number[]} matchAry Match Array
   * @returns {udefined} Updates matchAry
   */
  let checkBoardForMatch = function (value, row, column, xMove, yMove, matchAry) {

    let cellValue;
    
    do {

      // Move Next
      row += xMove;
      column += yMove;

      // Exit on Out of Bounds
      if (row < 0 || row > boardSizeY || column < 0 || column > boardSizeX) break; 
    
      // Get Text Node of Cell
      cellValue = getCellIdentifier(row, column);

      if (cellValue === value) matchAry.push([row, column]);

    } while (cellValue === value);

  };

  
  /** Returns Identifier for Cell
   * "character" Only for Now, "Color" Future Project
   * @param  {Number} row - 0 -> n
   * @param  {Number} column - 0 -> n
   * @returns {String} Identifyer
   * 
   */
  let getCellIdentifier = function (row, column) {

    let cell = gameBoard.children[row].children[column];

    if (cellIndenty === "character") {
      if (cell.firstChild) {
        return cell.firstChild.nodeValue;
      } else {
        return null;
      } 

    } else if (cellIndenty === "color") {
      // Future Color
    }
  };

  element("gameEnd").addEventListener("click",function(){
    reset();
    drawBoard();
  },false);

  element("gameSettings").addEventListener("click",function(){
    let elmt = element("changeSettings");
    elmt.style.display = elmt.style.display === "none" ? "" : "none";
  },false);


  element("updateSettings").addEventListener("click",function(){

    /** Set Player Names
     * @param  {String} id - HTML Element Id to Read Name
     * @param  {String} nameId - HTML Element Id to Write Name
     * @returns {undefined}
     */
    let setName = function (id, nameId) {
      let elId = element(id);
      let name = elId.value.trim() || elId.placeholder;
      element(nameId).firstChild.nodeValue = name;
    };
    setName("p1name","player1name");
    setName("p2name","player2name");

    /** Converts String to Number
     * @param  {String} size - String to Check
     * @returns {Number} Number
     */
    let checkSize = function (size) {
      let numSize = Number(size);
      if (numSize !== numSize) {
        alert(size + " is Not a Number Please Check and Reenter");
        return null;
      }
      return numSize;
    };

    // Set Game Size Width x Height
    let arySize = element("gameSize");
    arySize = arySize.value || arySize.placeholder;
    arySize =arySize.split(",");
    for (let i = 0; i < arySize.length ; i += 1) {
      let num = checkSize(arySize[i]);
      if (num === null) return;
      arySize[i] = num;
      if (i >= 1) break; // Only 2 Valid
    }
    boardSizeX = arySize[0]  - 1;
    boardSizeY = arySize[1] - 1 || arySize[0] - 1;

    // Set Win By
    let winBy = element("winBy");
    winBy = checkSize(winBy.value || winBy.placeholder);
    
    if (winBy === null) return;
    cellsLinedUpToWin = winBy;

    element("changeSettings").style.display = "none";

    // Draw Board
    element("gameEnd").hidden = "true";
    drawBoard();

  },false);

 






























}


