import testImg from "./IMG_2809.JPG";

const body = document.querySelector("body");

export function renderHomeTodoList() {
  const toDolistHeader = document.createElement("h1");
  toDolistHeader.textContent = "Adding Todo list header yeah!!";
  body.appendChild(toDolistHeader);
  const imgElement = document.createElement("img");
  imgElement.src = testImg;
  body.appendChild(imgElement);
}
