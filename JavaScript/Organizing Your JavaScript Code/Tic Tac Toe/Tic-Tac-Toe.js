import {
  wipeRenderedBoard,
  domDialogAndDrawLines,
  renderBoard,
} from "./render.js";
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

console.log("gameboard initial state", gameboard);

function playerTakesTurn(gameboard, player, rowIndex, columnIndex) {
  if (!gameboard[rowIndex][columnIndex]) {
    gameboard[rowIndex][columnIndex] = player.marker;
    turnsTaken++;
    console.log(
      player.name +
        " took their turn placing an '" +
        player.marker +
        "' in Row " +
        rowIndex +
        ", Column " +
        columnIndex
    );
  } else {
    console.log("This position is already taken, please try again");
  }
}

function playerTakesTurnHandler(rowIndex, columnIndex) {
  playerTakesTurn(gameboard, player, rowIndex, columnIndex);
  const result = checkBoardForWinners(player);
  console.log(1 + `gameboard [${rowIndex}] [${columnIndex}]`);
  player = player === player1 ? player2 : player1;
  switch (result) {
    case "First Row"{
      const drawLine = "linear-gradient(to bottom, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",

      domDialogAndDrawLines()
    }
    // draw the line
  } else {
    wipeRenderedBoard();
    renderBoard(gameboard, playerTakesTurnHandler);
  }
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

  const winninglinesLines = [
    firstRow.line,
    secondRow.line,
    thirdRow.line,
    firstColumn.line,
    secondColumn.line,
    thirdColumn.line,
    firstDiagonal.line,
    secondDiagonal.line,
  ];
  console.log("winningLines", winninglines);

  console.log("winningLinesLines", winninglinesLines);

  for (const winningline of winninglines) {
    if (winningline.line.every((item) => item === player1.marker)) {
      domDialogAndDrawLines(player1, player, gameboard, winningline);
    } else if (winningline.line.every((item) => item === player2.marker)) {
      domDialogAndDrawLines(player2, player, gameboard, winningline);
    }
  }

  if (winninglinesLines.every((line) => line.every((cell) => cell !== ""))) {
    console.log("No one won");
    const winnerDialog = document.createElement("dialog");
    const body = document.querySelector("body");
    body.appendChild(winnerDialog);
    winnerDialog.textContent = "No one won!?";
    winnerDialog.showModal();
    const clapping = new Audio("small-crowd-reactions-6977.mp3");
    clapping.play();

    console.log("Resetting board...");
    gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setTimeout(() => {
      console.log("Board reset");
      console.log(gameboard);
      wipeRenderedBoard();
      renderBoard(gameboard, playerTakesTurnHandler);
      winnerDialog.remove();
      clapping.pause();
    }, 6000);
  }
}
function switchPlayer(turns) {
  if (turns == 0 || turns % 2 == 0) {
    player = player1;
  } else {
    player = player2;
  }
  return player;
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

  renderBoard(gameboard, playerTakesTurnHandler);
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
