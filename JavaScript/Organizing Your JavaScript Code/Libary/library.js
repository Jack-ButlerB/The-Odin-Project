function Book(title, author, nPages, haveRead) {
  this.title = title;
  this.author = author;
  this.nPages = nPages;
  this.haveRead = haveRead;

  Book.prototype.info = function () {
    return title + " by " + author + ", " + nPages + " pages, " + haveRead;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
const myLibrary = [];

// Hard coded books
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");
const harryPotter = new Book(
  "Harry Potter and the Goblet of Fire",
  "J.K Rolling",
  205,
  "Read"
);
const lordOfTheRings = new Book(
  "Lord of the Rings",
  "J.R.R. Tolkien",
  499,
  "Not read yet"
);
const theBibble = new Book("The Bible", "Jesus", 1000, "Read");
addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(lordOfTheRings);
addBookToLibrary(theBibble);

console.log(myLibrary.length);

for (let i = 0; i < myLibrary.length; i++) {
  if (myLibrary.length == i) {
  }
}
// Why does it work without need to declare
// const bookDisplayTitle = document.getElementById("bookDisplayTitle");
// const book1Author = document.getElementById("book1Author");
// const book1Npages = document.getElementById("book1Npages");
// const book1HaveRead = document.getElementById("book1HaveRead");

let n = 0;
bookDisplayTitle.textContent = myLibrary[n].title;
book1Author.textContent = myLibrary[n].author;
book1Npages.textContent = myLibrary[n].nPages;
book1HaveRead.textContent = myLibrary[n].haveRead;

const next = document.getElementById("nextButton");

next.addEventListener("click", function () {
  if (n < myLibrary.length - 1) {
    n += 1;
    bookDisplayTitle.textContent = myLibrary[n].title;
    book1Author.textContent = myLibrary[n].author;
    book1Npages.textContent = myLibrary[n].nPages;
    book1HaveRead.textContent = myLibrary[n].haveRead;
    console.log(n);
  } else {
  }
});

const previous = document.getElementById("previousButton");

previous.addEventListener("click", function () {
  if (n > 0) {
    n -= 1;
    bookDisplayTitle.textContent = myLibrary[n].title;
    book1Author.textContent = myLibrary[n].author;
    book1Npages.textContent = myLibrary[n].nPages;
    book1HaveRead.textContent = myLibrary[n].haveRead;
    console.log(n);
  } else {
  }
});

const h1 = document.getElementById("h1");

const test = "Edited";

h1.textContent = test;

// document.querySelector("h1").textContent = "hello";

const newBookBtn = document.getElementById("newBookBtn");
const newBookForm = document.getElementById("newBookForm");

// function preventSavedefault(event) {
//   event.preventDefault();
//   console.log("Default prevented");
// }

// function readStatus(haveRead, targetedTd) {
//   if (myLibrary[n].haveRead == "Not read yet") {
//     myLibrary[n].haveRead = "Read";
//     bookDataHaveRead.textContent = myLibrary[n].haveRead;
//   } else if (myLibrary[n].haveRead == "Read") {
//     myLibrary[n].haveRead = "Not read yet";
//     bookDataHaveRead.textContent = myLibrary[n].haveRead;
//   } else {
//   }
// }
const tableOfBooks = document.getElementById("tableOfBooks");

function createBookRow() {
  for (let n = 0; n < myLibrary.length; n++) {
    const bookRow = document.createElement("tr");
    bookRow.setAttribute("id", "Book" + n);
    tableOfBooks.appendChild(bookRow);
    const bookDataTitle = document.createElement("td");
    bookDataTitle.textContent = myLibrary[n].title;
    bookRow.appendChild(bookDataTitle);
    const bookDataAuthor = document.createElement("td");
    bookDataAuthor.textContent = myLibrary[n].author;
    bookRow.appendChild(bookDataAuthor);
    const bookDataNPages = document.createElement("td");
    bookDataNPages.textContent = myLibrary[n].nPages;
    bookRow.appendChild(bookDataNPages);
    const bookDataHaveRead = document.createElement("td");
    bookDataHaveRead.textContent = myLibrary[n].haveRead;
    bookRow.appendChild(bookDataHaveRead);
    const readStatusBtnBox = document.createElement("td");
    const readStatusBtn = document.createElement("button");
    readStatusBtn.addEventListener("click", function readStatus() {
      if (myLibrary[n].haveRead == "Not read yet") {
        myLibrary[n].haveRead = "Read";
        bookDataHaveRead.textContent = myLibrary[n].haveRead;
      } else if (myLibrary[n].haveRead == "Read") {
        myLibrary[n].haveRead = "Not read yet";
        bookDataHaveRead.textContent = myLibrary[n].haveRead;
      } else {
      }
    });
    readStatusBtn.textContent = "Change";
    readStatusBtnBox.appendChild(readStatusBtn);
    bookRow.appendChild(readStatusBtnBox);
    const removeBtnBox = document.createElement("td");
    bookRow.appendChild(removeBtnBox);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", function () {
      myLibrary.splice(n, 1);
      console.log(myLibrary);
      console.log(bookRow.getAttribute("id"));
      // if (bookRow.getAttribute("id") == "Book" + n) {
      document.getElementById("Book" + n).remove();
      // }
    });
    removeBtnBox.appendChild(removeBtn);
  }
}

newBookBtn.addEventListener("click", function () {
  newBookForm.style.display = "block";
  newBookBtn.style.display = "none";
  console.log("clicked new book button");
  const formSaveBtn = document.getElementById("formSaveBtn");
  console.log(formSaveBtn);
});

formSaveBtn.addEventListener("click", function preventSavedefault(event) {
  event.preventDefault();
  console.log("Default prevented");

  function readRadioCheck() {
    if (document.getElementById("readRadio").checked) {
      return document.getElementById("readRadio").value;
    } else if (document.getElementById("notReadYetRadio").checked) {
      return document.getElementById("notReadYetRadio").value;
    }
  }

  const newBook = new Book(
    document.getElementById("newBookTitle").value,
    document.getElementById("newBookAuthor").value,
    document.getElementById("newBookNpages").value,
    readRadioCheck()
  );

  myLibrary.push(newBook);
  console.log(myLibrary);

  // Why doesn't this work
  // document.getElementById("newBookForm2").reset;

  // Form Reset
  document.getElementById("newBookTitle").value =
    document.getElementById("newBookAuthor").value =
    document.getElementById("newBookNpages").value =
      null;
  document.getElementById("notReadYetRadio").checked = true;

  newBookForm.style.display = "none";
  newBookBtn.style.display = "inline";
  if (tableOfBooks.lastChild) {
    while (tableOfBooks.lastChild.id !== "tableHeaderRow") {
      tableOfBooks.removeChild(tableOfBooks.lastChild);
    }
    createBookRow();
  } else {
    createBookRow();
  }
  // const newBookRow = document.createElement("tr");
  // tableOfBooks.appendChild(newBookRow);
  // const newBookDataTitle = document.createElement("td");
  // newBookDataTitle.textContent = document.getElementById("newBookTitle").value;
  // const newBookDataAuthor = document.createElement("td");
  // newBookDataAuthor.textContent =
  //   document.getElementById("newBookAuthor").value;
  // const newBookDataNpages = document.createElement("td");
  // newBookDataNpages.textContent =
  //   document.getElementById("newBookNpages").value;
  // const newBookDataHaveRead = document.createElement("td");
  // newBookDataHaveRead.textContent =
  //   document.getElementById("newBookHaveRead").value;
  // const readStatusBtnBox = document.createElement("td");
  // const readStatusBtn = document.createElement("button");
  // readStatusBtn.textContent = "Change";
  // readStatusBtnBox.appendChild(readStatusBtn);
  // newBookRow.append(
  //   newBookDataTitle,
  //   newBookDataAuthor,
  //   newBookDataNpages,
  //   newBookDataHaveRead,
  //   readStatusBtnBox
  // );
});

const showBooksBtn = document.getElementById("showBooksBtn");
showBooksBtn.addEventListener("click", function () {
  showBooksBtn.style.display = "none";
  if (tableOfBooks.lastChild) {
    while (tableOfBooks.lastChild.id !== "tableHeaderRow") {
      tableOfBooks.removeChild(tableOfBooks.lastChild);
    }
    createBookRow();
  } else {
    createBookRow();
  }

  // createBookRow();
  tableOfBooks.style.display = "block";
  console.log("last child" + tableOfBooks.children);
});
