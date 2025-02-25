import {
  renderBooks,
  renderNewBookForm,
  addBookToLibrary,
  Book,
} from "./render.js";

const myLibrary = [];

// Hard coded books
const theHobbit = new Book(
  0,
  "The Hobbit",
  "J.R.R. Tolkien",
  295,
  "Not read yet"
);
const harryPotter = new Book(
  1,
  "Harry Potter and the Goblet of Fire",
  "J.K Rolling",
  205,
  "Read"
);
const lordOfTheRings = new Book(
  2,
  "Lord of the Rings",
  "J.R.R. Tolkien",
  499,
  "Not read yet"
);
const theBibble = new Book(3, "The Bible", "Jesus", 1000, "Read");

addBookToLibrary(theHobbit, myLibrary);
addBookToLibrary(harryPotter, myLibrary);
addBookToLibrary(lordOfTheRings, myLibrary);
addBookToLibrary(theBibble, myLibrary);
console.log(myLibrary);

// page display of books
let n = 0;
bookDisplayTitle.textContent = myLibrary[n].title;
book1Author.textContent = myLibrary[n].author;
book1Npages.textContent = myLibrary[n].nPages;
book1HaveRead.textContent = myLibrary[n].haveRead;

const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", function () {
  if (n < myLibrary.length - 1) {
    n += 1;
    bookDisplayTitle.textContent = myLibrary[n].title;
    book1Author.textContent = myLibrary[n].author;
    book1Npages.textContent = myLibrary[n].nPages;
    book1HaveRead.textContent = myLibrary[n].haveRead;
  } else {
  }
});

const previousButton = document.getElementById("previousButton");
previousButton.addEventListener("click", function () {
  if (n > 0) {
    n -= 1;
    bookDisplayTitle.textContent = myLibrary[n].title;
    book1Author.textContent = myLibrary[n].author;
    book1Npages.textContent = myLibrary[n].nPages;
    book1HaveRead.textContent = myLibrary[n].haveRead;
  } else {
  }
});

const newBookBtn = document.getElementById("newBookBtn");
const tableOfBooks = document.getElementById("tableOfBooks");

document.getElementById("newBookForm2");
newBookBtn.addEventListener("click", function () {
  renderNewBookForm(undefined, myLibrary);
});

const showBooksBtn = document.getElementById("showBooksBtn");
showBooksBtn.addEventListener("click", function () {
  showBooksBtn.style.display = "none";
  tableOfBooks.replaceChildren();
  renderBooks(myLibrary);
  tableOfBooks.style.display = "block";
});
