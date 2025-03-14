// import { renderBoard } from "./render.js";
let player1 = { name: "Player 1", marker: "X" };
let player2 = { name: "Player 2", marker: "O" };

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

let player = player1;
let turnsTaken = 0;

console.log("gameboard initial state", gameboard);

function wipeAndRerenderBoard(gameboard, player) {
  const gameboardDiv = document.getElementById("gameboardDiv");
  gameboardDiv.remove();
  renderBoard(gameboard, player);
}

function checkBoardForWinners(player) {
  console.log("Player", player);
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
      winnerDialog = document.createElement("dialog");
      const body = document.querySelector("body");
      body.appendChild(winnerDialog);
      winnerDialog.textContent = `${player1.name} Wins!`;
      winnerDialog.showModal();
      const clapping = new Audio("small-crowd-clapping-2-106993.mp3");
      clapping.play();
      console.log(player1.name + " wins" + " on " + winningline.title);
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
        winnerDialog.remove();
      }, 9000);
    }
    // } else if (winningline.line.every((item) => item === player2.marker)) {
    //   const gameboardDiv = document.getElementById("gameboardDiv");

    //   if (winningline.drawLine) {
    //     gameboardDiv.style.background = winningline.drawLine;
    //   }
    //   winnerDialog = document.createElement("dialog");
    //   const body = document.querySelector("body");
    //   body.appendChild(winnerDialog);
    //   winnerDialog.textContent = `${player2.name} Wins!`;
    //   winnerDialog.showModal();
    //   const clapping = new Audio("small-crowd-clapping-2-106993.mp3");
    //   clapping.play();

    //   console.log(player2.name + " wins" + " on " + winningline.title);
    //   console.log("Resetting board...");
    //   gameboard = [
    //     ["", "", ""],
    //     ["", "", ""],
    //     ["", "", ""],
    //   ];
    //   setTimeout(() => {
    //     console.log("Board reset");
    //     console.log(gameboard);
    //     wipeAndRerenderBoard(gameboard, player);
    //     winnerDialog.remove();
    //   }, 9000);
    // }
  }
  //   if (
  //     !firstRow.line.every((item) => item) &&
  //     !secondRow.line.every((item) => item) &&
  //     !thirdRow.line.every((item) => item)
  //   ) {
  //     console.log("No one won");
  //     winnerDialog = document.createElement("dialog");
  //     const body = document.querySelector("body");
  //     body.appendChild(winnerDialog);
  //     winnerDialog.textContent = "No one won!?";
  //     winnerDialog.showModal();
  //     const clapping = new Audio("small-crowd-reactions-6977.mp3");
  //     clapping.play();

  //     console.log("Resetting board...");
  //     gameboard = [
  //       ["", "", ""],
  //       ["", "", ""],
  //       ["", "", ""],
  //     ];
  //     setTimeout(() => {
  //       console.log("Board reset");
  //       console.log(gameboard);
  //       wipeAndRerenderBoard(gameboard, player);
  //       winnerDialog.remove();
  //       clapping.pause();
  //     }, 6000);  }
}

function playerTakesTurn(gameboard, player, rowIndex, columnIndex) {
  // If cell is empty
  if (!gameboard[rowIndex][columnIndex]) {
    gameboard[rowIndex][columnIndex] = player.marker;
    turnsTaken++;
    console.log(player);
    console.log("turnsTaken" + turnsTaken);
    console.log(
      player.name +
        " took their turn placing an '" +
        player.marker +
        "' in Row " +
        rowIndex +
        ", Column " +
        columnIndex
    );

    player = player === player1 ? player2 : player1;

    // if (turnsTaken === 0 || turnsTaken % 2 === 0) {
    //   player = player1;
    // } else {
    //   player = player2;
    // }

    wipeAndRerenderBoard(gameboard, player, rowIndex, columnIndex);
    checkBoardForWinners(player);
  } else {
    console.log("This position is already taken, please try again");
  }
}

function createGameboardRow(gameboardDiv, gameboard, rowIndex, player) {
  // object,assign
  // return document.createElement("div").setAttribute("id", "gameboardRow");
  const rowBox = document.createElement("div");
  rowBox.setAttribute("id", "gameboardRow" + rowIndex);
  rowBox.style.display = "flex";
  rowBox.style.flexdirection = "row";
  gameboardDiv.appendChild(rowBox);

  for (let columnIndex = 0; columnIndex <= 2; columnIndex++) {
    const columnBox = document.createElement("div");
    columnBox.setAttribute("id", `gameboard [${rowIndex}] [${columnIndex}]`);
    columnBox.textContent = gameboard[rowIndex][columnIndex];
    columnBox.style.fontSize = "100px";
    columnBox.style.width = "100px";
    columnBox.style.height = "100px";
    columnBox.style.border = "2px blue solid";
    columnBox.style.display = "flex";
    columnBox.style.flex = "align";
    columnBox.style.justifyContent = "center";
    columnBox.style.alignItems = "center";
    columnBox.addEventListener("click", () => {
      playerTakesTurn(gameboard, player, rowIndex, columnIndex);
      console.log(1 + `gameboard [${rowIndex}] [${columnIndex}]`);
    });

    rowBox.appendChild(columnBox);
  }
}
function renderBoard(gameboard, player) {
  const body = document.querySelector("body");

  console.log("Adding board");
  const gameboardDiv = document.createElement("div");
  gameboardDiv.setAttribute("id", "gameboardDiv");
  gameboardDiv.style.border = "red 2px solid";
  gameboardDiv.style.width = "fit-content";
  body.appendChild(gameboardDiv);
  for (let rowIndex = 0; rowIndex <= 2; rowIndex++) {
    createGameboardRow(gameboardDiv, gameboard, rowIndex, player);
  }
}

const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("clicked");
  // const player1Name = ;
  player1.name =
    document.getElementById("player1Name")?.value ||
    document.getElementById("player1Name").placeholder;
  console.log(player1.name);
  player1.marker =
    document.getElementById("player1Marker")?.value ||
    document.getElementById("player1Marker").placeholder;

  player2.name =
    document.getElementById("player2Name")?.value ||
    document.getElementById("player2Name").placeholder;
  console.log(player2.name);

  player2.marker =
    document.getElementById("player2Marker")?.value ||
    document.getElementById("player2Marker").placeholder;

  renderBoard(gameboard, player);
});

// renderBoard(gameboard, player);

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
