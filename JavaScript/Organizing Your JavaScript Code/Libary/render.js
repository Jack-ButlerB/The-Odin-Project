export function Book(id, title, author, nPages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.nPages = nPages;
  this.haveRead = haveRead;

  Book.prototype.info = function () {
    return title + " by " + author + ", " + nPages + " pages long, " + haveRead;
  };
}

export function addBookToLibrary(book, library) {
  library.push(book);
}

const body = document.querySelector("body");

function createRowRowHeaderInput(formField, header, bookToEdit) {
  const newBookFormTableRow = document.createElement("tr");

  const newBookFormTable = document.getElementById("newFormTable");

  newBookFormTable.appendChild(newBookFormTableRow);

  const newBookFormTableRowHeader = document.createElement("th");
  newBookFormTableRowHeader.textContent = header;
  newBookFormTableRow.appendChild(newBookFormTableRowHeader);
  // console.log("book being passed", bookToEdit);
  // console.log(bookToEdit.title);
  // console.log("formField", formField);

  const newBookFormTableRowData = document.createElement("td");
  newBookFormTableRow.appendChild(newBookFormTableRowData);
  const newBookFormTableRowDataInput = document.createElement("input");
  newBookFormTableRowDataInput.setAttribute("type", "text");
  newBookFormTableRowDataInput.setAttribute("id", "newBook" + formField);
  if (formField == "title") {
    newBookFormTableRowDataInput.setAttribute("value", bookToEdit?.title || "");
  } else if (formField == "author") {
    newBookFormTableRowDataInput.setAttribute(
      "value",
      bookToEdit?.author || ""
    );
  } else if (formField == "nPages") {
    newBookFormTableRowDataInput.setAttribute(
      "value",
      bookToEdit?.nPages || ""
    );
  }
  newBookFormTableRowData.appendChild(newBookFormTableRowDataInput);
}

export function renderNewBookForm(bookToEdit, library) {
  console.log("this is the book to edit", bookToEdit);

  const newBookFormDialog = document.createElement("dialog");

  newBookFormDialog.setAttribute("id", "newBookForm");
  body.appendChild(newBookFormDialog);
  const newBookFormForm = document.createElement("form");
  newBookFormForm.setAttribute("id", "newBookForm2");
  newBookFormDialog.appendChild(newBookFormForm);
  const newBookFormTable = document.createElement("table");
  newBookFormTable.setAttribute("id", "newFormTable");
  newBookFormForm.appendChild(newBookFormTable);

  const formFields = {
    title: "Title",
    author: "Author",
    nPages: "Number of Pages",
  };

  for (const [key, value] of Object.entries(formFields)) {
    // console.log("key", key, "value", value, "BookToEdit", bookToEdit);
    createRowRowHeaderInput(key, value, bookToEdit);
  }

  const newBookFormTableRow4 = document.createElement("tr");
  newBookFormTable.appendChild(newBookFormTableRow4);

  const newBookFormTableRow4Header = document.createElement("th");
  newBookFormTableRow4Header.textContent = "Read or not?";
  newBookFormTableRow4.appendChild(newBookFormTableRow4Header);

  // const newBookFormTableRow4 = document.getElementById(
  //   "newBookFormTableRow" + 4
  // );
  const newBookFormTableRow4Data = document.createElement("td");
  newBookFormTableRow4.appendChild(newBookFormTableRow4Data);
  const newBookFormTableRow4DataInput = document.createElement("input");
  newBookFormTableRow4DataInput.setAttribute("type", "radio");
  newBookFormTableRow4DataInput.setAttribute("id", "readRadio");
  newBookFormTableRow4DataInput.setAttribute("value", "Read");
  newBookFormTableRow4Data.appendChild(newBookFormTableRow4DataInput);
  const newBookFormTableRow4DataInputLable = document.createElement("lable");
  newBookFormTableRow4DataInputLable.textContent = "Read";
  newBookFormTableRow4Data.appendChild(newBookFormTableRow4DataInputLable);

  const newBookFormTableRow4DataInput2 = document.createElement("input");
  newBookFormTableRow4DataInput2.setAttribute("type", "radio");
  newBookFormTableRow4DataInput2.setAttribute("id", "notReadYetRadio");
  newBookFormTableRow4DataInput2.setAttribute("value", "Not read yet");
  newBookFormTableRow4Data.appendChild(newBookFormTableRow4DataInput2);

  if (bookToEdit?.haveRead == "Read") {
    newBookFormTableRow4DataInput.checked = true;
  } else if (bookToEdit?.haveRead == "Not read yet") {
    newBookFormTableRow4DataInput2.checked = true;
  } else {
  }
  newBookFormTableRow4DataInput.addEventListener("click", function () {
    newBookFormTableRow4DataInput2.checked = false;
  });
  newBookFormTableRow4DataInput2.addEventListener("click", function () {
    newBookFormTableRow4DataInput.checked = false;
  });

  const newBookFormTableRow4DataInput2Lable = document.createElement("lable");
  newBookFormTableRow4DataInput2Lable.textContent = "Not Read Yet";
  newBookFormTableRow4Data.appendChild(newBookFormTableRow4DataInput2Lable);

  newBookFormTableRow4.appendChild(newBookFormTableRow4Data);

  const newBookFormSaveBtn = document.createElement("button");
  newBookFormSaveBtn.textContent = "Save";
  newBookFormForm.appendChild(newBookFormSaveBtn);
  newBookFormSaveBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // either editing passed book or push a new one to the 'library' array
    if (bookToEdit) {
      bookToEdit.title = document.getElementById("newBooktitle").value;
      bookToEdit.author = document.getElementById("newBookauthor").value;
      bookToEdit.nPages = document.getElementById("newBooknPages").value;
      bookToEdit.haveRead = newBookFormTableRow4DataInput.checked
        ? "Read"
        : "Not read yet";
    } else {
      let highestID = 0;

      for (const book of library) {
        if (book.id > highestID) {
          highestID = book.id;
        }
      }
      const newBookID = highestID + 1;
      const newBook = new Book(
        newBookID,
        document.getElementById("newBooktitle").value,
        document.getElementById("newBookauthor").value,
        document.getElementById("newBooknPages").value,
        newBookFormTableRow4DataInput.checked ? "Read" : "Not read yet"
      );
      library.push(newBook);
      console.log(library);
    }
    newBookFormDialog.remove();
    renderBooks(library);
  });
  newBookFormDialog.showModal();

  // if ESC is pressed whilst modal is open remove form from the DOM - google side effects, pure functions, returning early
  newBookFormDialog.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      newBookFormDialog.remove();
    }
  });
}

function createTableHeader(text) {
  const bookTableHeader = document.createElement("th");
  bookTableHeader.textContent = text;
  return bookTableHeader;
}
export function renderBooks(library) {
  tableOfBooks.replaceChildren();
  // Build header row
  const tableBody = document.createElement("tbody");
  tableOfBooks.appendChild(tableBody);
  const bookTableHeaderRow = document.createElement("tr");
  tableBody.appendChild(bookTableHeaderRow);

  // Refactor
  [
    "Title",
    "Author",
    "Number of Pages",
    "Read?",
    "Change read status?",
    "Edit",
    "Remove",
  ].forEach((item) => {
    bookTableHeaderRow.appendChild(createTableHeader(item));
  });

  // build book row from myLibrary array

  for (const book of library) {
    // console.log(book.id);
    const bookRow = document.createElement("tr");
    tableBody.appendChild(bookRow);

    const bookDataTitle = document.createElement("td");
    bookDataTitle.textContent = book.title;
    bookRow.appendChild(bookDataTitle);
    const bookDataAuthor = document.createElement("td");
    bookDataAuthor.textContent = book.author;
    bookRow.appendChild(bookDataAuthor);
    const bookDatanPages = document.createElement("td");
    bookDatanPages.textContent = book.nPages;
    bookRow.appendChild(bookDatanPages);
    const bookDataHaveRead = document.createElement("td");
    bookDataHaveRead.textContent = book.haveRead;
    bookRow.appendChild(bookDataHaveRead);
    const readStatusBtnBox = document.createElement("td");
    const readStatusBtn = document.createElement("button");
    readStatusBtn.addEventListener("click", function readStatus() {
      if (book.haveRead == "Not read yet") {
        book.haveRead = "Read";
        tableOfBooks.replaceChildren();
        renderBooks(library);
      } else if (book.haveRead == "Read") {
        book.haveRead = "Not read yet";
        tableOfBooks.replaceChildren();
        renderBooks(library);
      } else {
      }
    });
    readStatusBtn.textContent = "Change";
    readStatusBtnBox.appendChild(readStatusBtn);
    bookRow.appendChild(readStatusBtnBox);

    // Edit btn
    const editBtnBox = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Book";
    editBtn.addEventListener("click", function () {
      renderNewBookForm(book, library);
      console.log(library);
    });
    editBtnBox.appendChild(editBtn);
    bookRow.appendChild(editBtnBox);

    // Remove btn
    const removeBtnBox = document.createElement("td");
    bookRow.appendChild(removeBtnBox);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", function () {
      let bookIndex = library.indexOf(book);
      console.log(bookIndex);
      library.splice(bookIndex, 1);
      console.log(library);

      tableOfBooks.replaceChildren();
      renderBooks(library);
    });
    removeBtnBox.appendChild(removeBtn);
  }
  tableOfBooks.style.width = "100%";
  tableBody.style.width = "100%";
  bookTableHeaderRow.style.width = "100%";
}
