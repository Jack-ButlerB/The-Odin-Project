const player1 = { Name: "Player 1", marker: "X" };
const player2 = { Name: "Player 2", marker: "O" };

let Gameboard = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];
console.log("initial Gameboard", Gameboard[0], Gameboard[1], Gameboard[2]);

const firstColumn = [Gameboard[0][0], Gameboard[1][0], Gameboard[2][0]];
const secondColumn = [Gameboard[0][1], Gameboard[1][1], Gameboard[2][1]];
const thirdColumn = [Gameboard[0][2], Gameboard[1][2], Gameboard[2][2]];

// const winninglines = [
//   Gameboard[0],
//   Gameboard[1],
//   Gameboard[2],
//   // firstColumn,
//   // secondColumn,
//   // thirdColumn,
//   // [Gameboard[0][0], Gameboard[0][1], Gameboard[0][2]],
//   // [Gameboard[1][0], Gameboard[1][1], Gameboard[1][2]],
//   // [Gameboard[2][0], Gameboard[2][1], Gameboard[2][2]],
// ];

const firstLine = Gameboard[0][0] && Gameboard[0][1] && Gameboard[0][2];

// Only checking 3 rows at the moment to test
function checkBoardForWinners() {
  // console.log("winning line", winninglines[0]);
  // if (Gameboard[0][0] && Gameboard[0][1] && Gameboard[0][2] == "X") {
  //   console.log("player 1 wins");
  // }
  // console.log(Gameboard[0]);
  // if (Gameboard[0][0] == "X") {
  //   console.log("player 1 wins");
  // }
  // console.log(Gameboard[0]);
  if (
    // Rows
    (Gameboard[0][0] && Gameboard[0][1] && Gameboard[0][2] == "X") ||
    (Gameboard[1][0] && Gameboard[1][1] && Gameboard[1][2] == "X") ||
    (Gameboard[2][0] && Gameboard[2][1] && Gameboard[2][2] == "X") ||
    // Colunms
    (Gameboard[0][0] && Gameboard[1][0] && Gameboard[2][0] == "X") ||
    (Gameboard[0][1] && Gameboard[1][1] && Gameboard[2][1] == "X") ||
    (Gameboard[0][2] && Gameboard[1][2] && Gameboard[2][2] == "X") ||
    // Diagonals
    (Gameboard[0][0] && Gameboard[1][1] && Gameboard[2][2] == "X") ||
    (Gameboard[0][2] && Gameboard[1][1] && Gameboard[2][0] == "X")
  ) {
    console.log("player 1 wins");
  } else if (
    // Rows
    (Gameboard[0][0] && Gameboard[0][1] && Gameboard[0][2] == "O") ||
    (Gameboard[1][0] && Gameboard[1][1] && Gameboard[1][2] == "O") ||
    (Gameboard[2][0] && Gameboard[2][1] && Gameboard[2][2] == "O") ||
    // Colunms
    (Gameboard[0][0] && Gameboard[1][0] && Gameboard[2][0] == "O") ||
    (Gameboard[0][1] && Gameboard[1][1] && Gameboard[2][1] == "O") ||
    (Gameboard[0][2] && Gameboard[1][2] && Gameboard[2][2] == "O") ||
    // Diagonals
    (Gameboard[0][0] && Gameboard[1][1] && Gameboard[2][2] == "O") ||
    (Gameboard[0][2] && Gameboard[1][1] && Gameboard[2][0] == "O")
  ) {
    console.log("player 2 wins");
  } else {
  }

  // for (const winningline of winninglines) {
  //   if (winningline == ["X", "X", "X"]) {
  //     const playerWins = "Player 1 wins";
  //     console.log(playerWins);
  //   } else {
  //   }
  // }
}

function playerTakesTurn(player, row, column) {
  if (Gameboard[row][column] == "-") {
    Gameboard[row][column] = player.marker;
    console.log("Gameboard", Gameboard[0], Gameboard[1], Gameboard[2]);
    checkBoardForWinners();
  } else {
    console.log("This position is already taken, please try again");
  }
}
// First row
// playerTakesTurn(player1, 0, 0),
//   playerTakesTurn(player1, 0, 1),
//   playerTakesTurn(player1, 0, 2);

// playerTakesTurn(player1, 1, 0),
//   playerTakesTurn(player1, 1, 1),
//   playerTakesTurn(player1, 1, 2);

// playerTakesTurn(player1, 2, 0),
//   playerTakesTurn(player1, 2, 1),
//   playerTakesTurn(player1, 2, 2);
// First column
// playerTakesTurn(player1, 0, 0),
//   playerTakesTurn(player1, 1, 0),
//   playerTakesTurn(player1, 2, 0);
// playerTakesTurn(player2, 0, 0),
//   playerTakesTurn(player2, 1, 0),
//   playerTakesTurn(player2, 2, 0);

// function consolePlayGame() {

// }
