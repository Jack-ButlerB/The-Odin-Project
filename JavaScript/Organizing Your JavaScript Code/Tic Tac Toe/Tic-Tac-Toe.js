import {
  wipeRenderedBoard,
  domDialogAndDrawLines,
  renderBoard,
  positionTakenFlash,
} from "./render.js";
let player1 = { name: "Player 1", marker: "X" };
let player2 = { name: "Player 2", marker: "O" };

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
    console.log(
      player.name +
        " took their turn placing an '" +
        player.marker +
        "' in Row " +
        rowIndex +
        ", Column " +
        columnIndex
    );
    return;
  } else {
    console.log("This position is already taken, please try again");
    return "position taken";
  }
}

function playerTakesTurnHandler(rowIndex, columnIndex) {
  if (
    playerTakesTurn(gameboard, player, rowIndex, columnIndex) ===
    "position taken"
  ) {
    positionTakenFlash();
  } else {
    playerTakesTurn(gameboard, player, rowIndex, columnIndex);

    wipeRenderedBoard();
    renderBoard(gameboard, playerTakesTurnHandler);
    console.log(isBoardFull(gameboard) ? "Board is full" : "Board is not full");
    const winningLine = getWinningLine(player);

    if (winningLine) {
      gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      domDialogAndDrawLines(
        player,
        gameboard,
        winningLine,
        playerTakesTurnHandler
      );
    }
    // switch (result) {
    //   case "First Row":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to bottom, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)"
    //     );
    //     break;
    //   case "Second Row":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to bottom, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)"
    //     );
    //     break;
    //   case "Third Row":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to top, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)"
    //     );
    //     break;
    //   case "First Column":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to right, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)"
    //     );
    //     break;

    //   case "Second Column":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to right, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)"
    //     );
    //     break;
    //   case "Third Column":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to left, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)"
    //     );
    //     break;
    //   case "Diagonal (top left to bottom right)":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to top right, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)"
    //     );
    //     break;
    //   case "Diagonal (bottom left to top right)":
    //     domDialogAndDrawLines(
    //       player,
    //       gameboard,
    //       "linear-gradient(to top left, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)"
    //     );
    //     break;

    //   // draw the line
    //   default:
    // }
    player = player === player1 ? player2 : player1;
  }
}

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

function getWinningLine(player) {
  firstRow.line = [gameboard[0][0], gameboard[0][1], gameboard[0][2]];
  secondRow.line = [gameboard[1][0], gameboard[1][1], gameboard[1][2]];
  thirdRow.line = [gameboard[2][0], gameboard[2][1], gameboard[2][2]];
  firstColumn.line = [gameboard[0][0], gameboard[1][0], gameboard[2][0]];
  secondColumn.line = [gameboard[0][1], gameboard[1][1], gameboard[2][1]];
  thirdColumn.line = [gameboard[0][2], gameboard[1][2], gameboard[2][2]];
  firstDiagonal.line = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
  secondDiagonal.line = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];

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
  // checking for a winner on each line and returning that the varible linked to that line
  for (const winningline of winninglines) {
    if (winningline.line.every((item) => item === player.marker)) {
      return winningline;
    }
  }
}

function isBoardFull(gameboard) {
  return gameboard.every((line) => line.every((cell) => cell));
}

const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log("clicked");
  player1.name =
    document.getElementById("player1Name")?.value ||
    document.getElementById("player1Name").placeholder;
  player1.marker =
    document.getElementById("player1Marker")?.value ||
    document.getElementById("player1Marker").placeholder;

  player2.name =
    document.getElementById("player2Name")?.value ||
    document.getElementById("player2Name").placeholder;

  player2.marker =
    document.getElementById("player2Marker")?.value ||
    document.getElementById("player2Marker").placeholder;

  document.getElementById("formSubmit").style.display = "none";

  renderBoard(gameboard, playerTakesTurnHandler);
});
