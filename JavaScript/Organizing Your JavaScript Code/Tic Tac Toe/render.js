export function wipeRenderedBoard() {
  const gameboardDiv = document.getElementById("gameboardDiv");
  gameboardDiv.remove();
}
export function domDialogAndDrawLines(
  playerTakingTurn,
  gameboard,
  paramWinningline,
  eventCallback
) {
  const gameboardDiv = document.getElementById("gameboardDiv");
  // console.log("winning line gameboard", gameboard);
  // console.log("code for drawing line", paramWinningline.drawLine);
  gameboardDiv.style.background = paramWinningline.drawLine;
  const winnerDialog = document.createElement("dialog");
  const body = document.querySelector("body");
  body.appendChild(winnerDialog);
  let audio = null;
  if (paramWinningline === "all spaces filled, no winner") {
    console.log("No one won");
    winnerDialog.textContent = "No one won!?";
    audio = new Audio("small-crowd-reactions-6977.mp3");
  } else {
    winnerDialog.textContent = `${playerTakingTurn.name} Wins!`;
    audio = new Audio("small-crowd-clapping-2-106993.mp3");
    audio.play();
    console.log(
      playerTakingTurn.name + " wins" + " on " + paramWinningline.title
    );
  }
  const resetButton = document.createElement("button");
  resetButton.textContent = "Play Again?";
  resetButton.addEventListener("click", () => {
    winnerDialog.remove();
    wipeRenderedBoard();
    renderBoard(gameboard, eventCallback);
  });
  winnerDialog.appendChild(resetButton);
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 5000);

  winnerDialog.showModal();

  // gameboard = [
  //   ["", "", ""],
  //   ["", "", ""],
  //   ["", "", ""],
  // ];
  // setTimeout(() => {
  //   console.log("Board reset");
  //   console.log(gameboard);
  //   wipeRenderedBoard();
  //   renderBoard(gameboard, playerTakingTurn);
  //   winnerDialog.remove();
  // }, 9000);
}

export function renderBoard(gameboard, eventCallback) {
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
        eventCallback(rowIndex, columnIndex);
      });

      rowBox.appendChild(columnBox);
    }
  }
}

export function positionTakenFlash() {
  const body = document.querySelector("body");
  const positionTaken = document.createElement("h1");
  positionTaken.textContent =
    "This position is already taken, please try again";
  body.appendChild(positionTaken);
  setTimeout(() => {
    positionTaken.remove();
  }, 1500);
}
