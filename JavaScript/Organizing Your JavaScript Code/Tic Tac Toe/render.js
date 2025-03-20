export function wipeRenderedBoard() {
  const gameboardDiv = document.getElementById("gameboardDiv");
  gameboardDiv.remove();
}
export function domDialogAndDrawLines(
  lookupPlayer,
  playerTakingTurn,
  gameboard,
  paramWinningline
) {
  const gameboardDiv = document.getElementById("gameboardDiv");
  console.log("winning line gameboard", gameboard);
  gameboardDiv.style.background = paramWinningline.drawLine;
  const winnerDialog = document.createElement("dialog");
  const body = document.querySelector("body");
  body.appendChild(winnerDialog);
  winnerDialog.textContent = `${lookupPlayer.name} Wins!`;
  winnerDialog.showModal();
  const clapping = new Audio("small-crowd-clapping-2-106993.mp3");
  clapping.play();
  console.log(lookupPlayer.name + " wins" + " on " + paramWinningline.title);
  gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  setTimeout(() => {
    console.log("Board reset");
    console.log(gameboard);
    wipeRenderedBoard();
    renderBoard(gameboard, playerTakingTurn);
    winnerDialog.remove();
  }, 9000);
}
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

export function renderBoard(gameboard, player) {
  const body = document.querySelector("body");

  console.log("Adding board");
  const gameboardDiv = document.createElement("div");
  gameboardDiv.setAttribute("id", "gameboardDiv");
  gameboardDiv.style.border = "red 2px solid";
  gameboardDiv.style.width = "fit-content";
  body.appendChild(gameboardDiv);
  for (let rowIndex = 0; rowIndex <= 2; rowIndex++) {
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
        player = player === player1 ? player2 : player1;
        wipeRenderedBoard();
        renderBoard(gameboard, player);
        checkBoardForWinners(player);
      });

      rowBox.appendChild(columnBox);
    }
  }
}
