// import { renderBoard } from "./render.js";
const player1 = { name: "Player 1", marker: "X" };
const player2 = { name: "Player 2", marker: "O" };

// make empty entries either null or empty string. Better to be falsey
// let gameboard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
let gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

console.log("gameboard initial state", gameboard);

function wipeAndRerenderBoard(gameboard, player, row, column) {
  const gameboardDiv = document.getElementById("gameboardDiv");
  gameboardDiv.remove();
  renderBoard(gameboard, player, row, column);
}

function checkBoardForWinners(player) {
  const firstRow = {
    title: "First Row",
    line: [gameboard[0][0], gameboard[0][1], gameboard[0][2]],
    drawLine:
      "linear-gradient(to bottom, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
  };
  const secondRow = {
    title: "Second Row",
    line: [gameboard[1][0], gameboard[1][1], gameboard[1][2]],
    drawLine:
      "linear-gradient(to bottom, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
  };
  const thirdRow = {
    title: "Third Row",
    line: [gameboard[2][0], gameboard[2][1], gameboard[2][2]],
    drawLine:
      "linear-gradient(to top, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
  };
  const firstColumn = {
    title: "First Column",
    line: [gameboard[0][0], gameboard[1][0], gameboard[2][0]],
    drawLine:
      "linear-gradient(to right, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
  };
  const secondColumn = {
    title: "Second Column",
    line: [gameboard[0][1], gameboard[1][1], gameboard[2][1]],
    drawLine:
      "linear-gradient(to right, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
  };
  const thirdColumn = {
    title: "Third Column",
    line: [gameboard[0][2], gameboard[1][2], gameboard[2][2]],
    drawLine:
      "linear-gradient(to left, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
  };
  const firstDiagonal = {
    title: "Diagonal (top left to bottom right)",
    line: [gameboard[0][0], gameboard[1][1], gameboard[2][2]],
    drawLine:
      "linear-gradient(to top right, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
  };
  const secondDiagonal = {
    title: "Diagonal (bottom left to top right)",
    line: [gameboard[0][2], gameboard[1][1], gameboard[2][0]],
    drawLine:
      "linear-gradient(to top left, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
  };

  const winninglines = [
    firstRow,
    secondRow,
    thirdRow,
    firstColumn,
    secondColumn,
    thirdColumn,
    firstDiagonal,
    secondDiagonal,
  ];

  for (const winningline of winninglines) {
    if (winningline.line.every((item) => item === player.marker)) {
      const gameboardDiv = document.getElementById("gameboardDiv");

      if (winningline.drawLine) {
        gameboardDiv.style.background = winningline.drawLine;
      }
      console.log(player.name + " wins" + " on " + winningline.title);
      console.log("Resetting board...");
      gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      setTimeout(() => {
        console.log("Board reset");
        console.log(gameboard);
        wipeAndRerenderBoard(gameboard, player);
      }, 3000);
    }
  }
}

function playerTakesTurn(gameboardChosen, player, row, column) {
  if (!gameboardChosen[row][column]) {
    gameboardChosen[row][column] = player.marker;
    console.log(
      player.name +
        " took their turn placing an '" +
        player.marker +
        "' in Row " +
        row +
        ", Column " +
        column
    );
    wipeAndRerenderBoard(gameboardChosen, player, row, column);
    console.log("gameboard after turn", gameboardChosen);
    checkBoardForWinners(player);
  } else {
    console.log("This position is already taken, please try again");
  }
}

export function createGameboardRow(
  gameboardDiv,
  gameboardChosen,
  rowNumber,
  player
) {
  // object,assign
  // return document.createElement("div").setAttribute("id", "gameboardRow");
  const rowBox = document.createElement("div");
  rowBox.setAttribute("id", "gameboardRow" + rowNumber);
  rowBox.style.display = "flex";
  rowBox.style.flexdirection = "row";
  gameboardDiv.appendChild(rowBox);

  for (let n = 0; n <= 2; n++) {
    const columnBox = document.createElement("div");
    columnBox.setAttribute("id", `gameboard [${rowNumber}] [${n}]`);
    columnBox.textContent = gameboardChosen[rowNumber][n];
    columnBox.style.fontSize = "100px";
    columnBox.style.width = "100px";
    columnBox.style.height = "100px";
    columnBox.style.border = "2px blue solid";
    columnBox.style.display = "flex";
    columnBox.style.flex = "align";
    columnBox.style.justifyContent = "center";
    columnBox.style.alignItems = "center";
    columnBox.addEventListener("click", () => {
      playerTakesTurn(gameboardChosen, player, rowNumber, n);
      console.log(`gameboard [${rowNumber}] [${n}]`);
    });

    rowBox.appendChild(columnBox);
  }
}
export function renderBoard(gameboardChosen, player, row, column) {
  const body = document.querySelector("body");

  console.log("Adding board");
  const gameboardDiv = document.createElement("div");
  gameboardDiv.setAttribute("id", "gameboardDiv");
  gameboardDiv.style.border = "red 2px solid";
  gameboardDiv.style.width = "fit-content";
  // gameboardDiv.style.height = "100px";
  body.appendChild(gameboardDiv);
  for (let j = 0; j <= 2; j++) {
    createGameboardRow(gameboardDiv, gameboardChosen, j, player);
  }
}

renderBoard(gameboard, player2);

// Functions for filling winning lines
// function fill1stRow() {
//   playerTakesTurn(player1, 0, 0);
//   playerTakesTurn(player1, 0, 1);
//   playerTakesTurn(player1, 0, 2);
// }
// // fill1stRow();
// function fill2ndRow() {
//   playerTakesTurn(player1, 1, 0);
//   playerTakesTurn(player1, 1, 1);
//   playerTakesTurn(player1, 1, 2);
// }
// // fill2ndRow();
// function fill3rdRow() {
//   playerTakesTurn(player1, 2, 0);
//   playerTakesTurn(player1, 2, 1);
//   playerTakesTurn(player1, 2, 2);
// }
// function fill1stCol() {
//   playerTakesTurn(player1, 0, 0);
//   playerTakesTurn(player1, 1, 0);
//   playerTakesTurn(player1, 2, 0);
// }
// function fill2ndCol() {
//   playerTakesTurn(player1, 0, 1);
//   playerTakesTurn(player1, 1, 1);
//   playerTakesTurn(player1, 2, 1);
// }
// function fill3rdCol() {
//   playerTakesTurn(player1, 0, 2);
//   playerTakesTurn(player1, 1, 2);
//   playerTakesTurn(player1, 2, 2);
// }
// function fill1stDiag() {
//   playerTakesTurn(player1, 0, 0);
//   playerTakesTurn(player1, 1, 1);
//   playerTakesTurn(player1, 2, 2);
// }
// function fill2ndDiag() {
//   playerTakesTurn(player1, 0, 2);
//   playerTakesTurn(player1, 1, 1);
//   playerTakesTurn(player1, 2, 0);
// }

// function playGame() {
//   playerTakesTurn(player1, 1, 1);
//   playerTakesTurn(player2, 2, 0);
//   playerTakesTurn(player1, 2, 2);
//   playerTakesTurn(player2, 0, 0);
//   playerTakesTurn(player1, 0, 1);
//   playerTakesTurn(player2, 1, 0);
//   playerTakesTurn(player2, 1, 0);
// }

// import { gameboard } from "./Tic-Tac-Toe";
