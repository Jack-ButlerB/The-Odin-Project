const showModalButton = document.getElementById("showModalBtn");
const dialog = document.getElementById("dialog");
showModalButton.addEventListener("click", function () {
  dialog.showModal();
});
const body = document.querySelector("body");
body.style.backgroundColor = "grey";

const textDisplayer = document.getElementById("paraToAddText");

const object = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6 };

const { a, b, g } = object;

const array = [1, 2, 3, 4, 5];
const [firstEle, secondEle, ...unPo] = array;
// const array2 = [1, 2, 3, 4, 5];
// const [firstEle, secondEle, ...rest] = array;

textDisplayer.textContent = unPo;
