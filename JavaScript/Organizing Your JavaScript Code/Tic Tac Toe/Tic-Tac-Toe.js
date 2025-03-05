const player1 = { Name: "Player 1", marker: "X" };
const player2 = { Name: "Player 2", marker: "O" };

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

function checkBoardForWinners(player) {
  // console.log("player", player);
  const firstRow = {
    title: "First Row",
    line: [gameboard[0][0], gameboard[0][1], gameboard[0][2]],
  };
  const secondRow = {
    title: "Second Row",
    line: [gameboard[1][0], gameboard[1][1], gameboard[1][2]],
  };
  const thirdRow = {
    title: "Third Row",
    line: [gameboard[2][0], gameboard[2][1], gameboard[2][2]],
  };
  const firstColumn = {
    title: "First Column",
    line: [gameboard[0][0], gameboard[1][0], gameboard[2][0]],
  };
  const secondColumn = {
    title: "Second Column",
    line: [gameboard[0][1], gameboard[1][1], gameboard[2][1]],
  };
  const thirdColumn = {
    title: "Third Column",
    line: [gameboard[0][2], gameboard[1][2], gameboard[2][2]],
  };
  const firstDiagonal = {
    title: "Diagonal (top left to bottom right)",
    line: [gameboard[0][0], gameboard[1][1], gameboard[2][2]],
  };
  const secondDiagonal = {
    title: "Diagonal (bottom left to top right)",
    line: [gameboard[0][2], gameboard[1][1], gameboard[2][0]],
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
      console.log(player.Name + " wins" + " on " + winningline.title);
      console.log("Resetting board...");
      gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      setTimeout(() => {
        console.log("Board reset");
        console.log(gameboard);
      }, 2000);
    }
  }
}
function playerTakesTurn(player, row, column) {
  if (gameboard[row][column] == "") {
    gameboard[row][column] = player.marker;
    console.log("gameboard after turn", gameboard);
    checkBoardForWinners(player);
  } else {
    console.log("This position is already taken, please try again");
  }
}

// Functions for filling winning lines
function fill1stRow() {
  playerTakesTurn(player1, 0, 0);
  playerTakesTurn(player1, 0, 1);
  playerTakesTurn(player1, 0, 2);
}
function fill2ndRow() {
  playerTakesTurn(player1, 1, 0);
  playerTakesTurn(player1, 1, 1);
  playerTakesTurn(player1, 1, 2);
}
function fill3rdRow() {
  playerTakesTurn(player1, 2, 0);
  playerTakesTurn(player1, 2, 1);
  playerTakesTurn(player1, 2, 2);
}
function fill1stCol() {
  playerTakesTurn(player1, 0, 0);
  playerTakesTurn(player1, 1, 0);
  playerTakesTurn(player1, 2, 0);
}
function fill2ndCol() {
  playerTakesTurn(player1, 0, 1);
  playerTakesTurn(player1, 1, 1);
  playerTakesTurn(player1, 2, 1);
}
function fill3rdCol() {
  playerTakesTurn(player1, 0, 2);
  playerTakesTurn(player1, 1, 2);
  playerTakesTurn(player1, 2, 2);
}
function fill1stDiag() {
  playerTakesTurn(player1, 0, 0);
  playerTakesTurn(player1, 1, 1);
  playerTakesTurn(player1, 2, 2);
}
function fill2ndDiag() {
  playerTakesTurn(player1, 0, 2);
  playerTakesTurn(player1, 1, 1);
  playerTakesTurn(player1, 2, 0);
}

function playgame() {
  playerTakesTurn(player1, 1, 1);
  playerTakesTurn(player2, 2, 0);
  playerTakesTurn(player1, 2, 2);
  playerTakesTurn(player2, 0, 0);
  playerTakesTurn(player1, 0, 1);
  playerTakesTurn(player1, 0, 1);
  playerTakesTurn(player2, 1, 0);
  playerTakesTurn(player2, 1, 0);
}
