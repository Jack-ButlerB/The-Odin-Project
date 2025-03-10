// // import { gameboard } from "./Tic-Tac-Toe";
// function playerTakesTurn(gameboardChosen, player, row, column) {
//   if (!gameboardChosen[row][column]) {
//     gameboardChosen[row][column] = player.marker;
//     console.log(
//       player.name +
//         " took their turn placing an '" +
//         player.marker +
//         "' in Row " +
//         row +
//         ", Column " +
//         column
//     );
//     // wipeAndRerenderBoard(gameboardChosen, player, row, column);
//     console.log("gameboard after turn", gameboardChosen);
//     // checkBoardForWinners(player);
//   } else {
//     console.log("This position is already taken, please try again");
//   }
// }

// export function createGameboardRow(
//   gameboardDiv,
//   gameboardChosen,
//   rowNumber,
//   player
// ) {
//   // object,assign
//   // return document.createElement("div").setAttribute("id", "gameboardRow");
//   const rowBox = document.createElement("div");
//   rowBox.setAttribute("id", "gameboardRow" + rowNumber);
//   rowBox.style.display = "flex";
//   rowBox.style.flexdirection = "row";
//   gameboardDiv.appendChild(rowBox);

//   for (let n = 0; n <= 2; n++) {
//     const columnBox = document.createElement("div");
//     columnBox.setAttribute("id", `gameboard [${rowNumber}] [${n}]`);
//     columnBox.textContent = gameboardChosen[rowNumber][n];
//     columnBox.style.fontSize = "100px";
//     columnBox.style.width = "100px";
//     columnBox.style.height = "100px";
//     columnBox.style.border = "2px blue solid";
//     columnBox.style.display = "flex";
//     columnBox.style.flex = "align";
//     columnBox.style.justifyContent = "center";
//     columnBox.style.alignItems = "center";
//     columnBox.addEventListener("click", () => {
//       playerTakesTurn(gameboardChosen, player, rowNumber, n);
//       console.log(`gameboard [${rowNumber}] [${n}]`);
//     });

//     rowBox.appendChild(columnBox);
//   }
// }
// export function renderBoard(gameboardChosen, player, row, column) {
//   const body = document.querySelector("body");

//   console.log("Adding board");
//   const gameboardDiv = document.createElement("div");
//   gameboardDiv.setAttribute("id", "gameboardDiv");
//   gameboardDiv.style.border = "none";
//   // gameboardDiv.style.height = "100px";
//   body.appendChild(gameboardDiv);
//   for (let j = 0; j <= 2; j++) {
//     createGameboardRow(gameboardDiv, gameboardChosen, j, player);
//   }
// }
