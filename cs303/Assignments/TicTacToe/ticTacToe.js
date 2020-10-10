/* eslint-disable id-length */
"use strict";
{

let boardSize = 2 //Starts at 0
let gameTable;
let cellsLinedUpToWin = 3;


let winners = [];
let player1Selections = [];
let player2Selections = [];
let timer;
let numberOfPlayers = 2;
let currentPlayer = 0;
let move = 0;
let points1 = 0;    // player 1 points
let points2 = 0;    // player 2 points
let size = 3;

/** Draw Board
 * @returns {undefined} 
 */
let drawBoard = function () {
    gameTable = document.getElementById("game");
    let counter = 1;
    
    while (gameTable.hasChildNodes()) {
      gameTable.removeChild(gameTable.firstChild);
    }

    for (let s = 0; s < 3; s++) {
        let row = document.createElement("tr");
        
        for (let r = 0; r < 3; r++) {
            let col = document.createElement("td");
            col.id = counter;

            /**
             * @param {Object} e Event
             * @returns {undefined} 
             */
            let handler = function(e) {

              let elmt = e.target;

                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b;});
                    d("player1").classList.remove("selected");
                    d("player2").classList.add("selected");
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b;});
                    d("player1").classList.add("selected");
                    d("player2").classList.remove("selected");
                }
                checkForWinner(elmt);//////Updated
                if (checkWinner())
                {
                    if(currentPlayer == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    reset();
                    drawBoard();
                }

                else if (player2Selections.length + player1Selections.length == 9)
                {
                    reset();
                    drawBoard();
                }
                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    // this.removeEventListener("click", arguments.callee);
                    elmt.removeEventListener("click", handler, false);
                    
                }
            };

            col.addEventListener("click", handler, false);

            row.appendChild(col);
            counter++;
        }

        gameTable.appendChild(row);
    }

    loadAnswers();
};

/** Get Element By Id
 * @param {String} id - Element HTML Id
 * @returns {Object} - Element
 */
let d = function (id) {
  return document.getElementById(id);
};

/** Reset Board
 * @returns {undefined} 
 */
let reset = function () {
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    d("player1").classList.add("selected");
    d("player2").classList.remove("selected");
};

/** Load Answers
 * @returns {undefined} 
 */
let loadAnswers = function () {
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
};


/** Check for Winner
 * @returns {Boolean}  true / false
 */
let checkWinner = function () {
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    let win = false;
    let playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
	playerSelections = player2Selections;
    
    if (playerSelections.length >= size) {
        // check if any 'winners' are also in your selections
        
        for (let i = 0; i < winners.length; i++) {
            let sets = winners[i];  // winning hand
            let setFound = true;
            
            for (let r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                let found = false;
                
                // players hand
                for (let s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
};

// window.addEventListener("load", drawBoard);
drawBoard();




/** Check for Winner
 * @param  {Object} cellClicked - Cell Just Picked
 * @returns {Boolean} Winner true/false
 */
let checkForWinner = function (cellClicked) {

    // Get Identification & Location
  let id = cellClicked.firstChild.nodeValue;
  let colStart = cellClicked.cellIndex;
  let rowStart = cellClicked.parentElement.rowIndex;

    // Check Horizontally
    let result = [[rowStart, colStart]];
    checkForMatch(id, rowStart, colStart, 1, 0, result);
    checkForMatch(id, rowStart, colStart, -1, 0, result);
    if (result.length >= cellsLinedUpToWin){} // Win

    // Check Vertically
    result = [[rowStart, colStart]];
    checkForMatch(id, rowStart, colStart, 0, 1, result);
    checkForMatch(id, rowStart, colStart, 0, -1, result);
    if (result.length >= cellsLinedUpToWin){} // Win

    // Check Right Diaginal
    result = [[rowStart, colStart]];
    checkForMatch(id, rowStart, colStart, 1, 1, result);
    checkForMatch(id, rowStart, colStart, -1, -1, result);
    if (result.length >= cellsLinedUpToWin){} // Win

     // Check Left Diaginal
     result = [[rowStart, colStart]];
     checkForMatch(id, rowStart, colStart, 1, -1, result);
     checkForMatch(id, rowStart, colStart, -1, 1, result);
     if (result.length >= cellsLinedUpToWin){} // Win


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
  let checkForMatch = function (value, row, column, xMove, yMove, matchAry) {

    let cellValue;
    
    do {

      // Move Next
      row += xMove;
      column += yMove;

      // Exit on Out of Bounds
      if (row < 0 || row > boardSize || column < 0 || column > boardSize) break; 
    
      // Get Text Node of Cell
      cellValue = gameTable.children[row].children[column].firstChild;

      if (!cellValue) break; // Break on No Text Nodes

      if (cellValue.nodeValue === value) matchAry.push([row, column]);

    } while (cellValue === value);

  };

  
































}


