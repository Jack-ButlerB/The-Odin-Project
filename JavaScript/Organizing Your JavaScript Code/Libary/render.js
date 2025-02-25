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

// function createFormRow(header, bookProperty, bookToEdit) {
//   const newBookFormTableRow1 = document.createElement("tr");
//   const newBookFormTable = document.getElementById("newFormTable");

//   newBookFormTable.appendChild(newBookFormTableRow1);

//   const newBookFormTableRow1Header = document.createElement("th");
//   newBookFormTableRow1Header.textContent = header;
//   newBookFormTableRow1.appendChild(newBookFormTableRow1Header);

//   const newBookFormTableRow1Data = document.createElement("td");
//   newBookFormTableRow1.appendChild(newBookFormTableRow1Data);
//   const newBookFormTableRow1DataInput = document.createElement("input");
//   newBookFormTableRow1DataInput.setAttribute("type", "text");
//   newBookFormTableRow1DataInput.setAttribute("id", "newBookTitle");
//   newBookFormTableRow1DataInput.setAttribute(
//     "value",
//     bookToEdit?.(bookProperty) || ""
//   );
//   newBookFormTableRow1Data.appendChild(newBookFormTableRow1DataInput);
// }

function creatNewRow(number) {
  const newBookFormTableRow = document.createElement("tr");
  newBookFormTableRow.setAttribute("id", "newBookFormTableRow" + number);
  document.getElementById("newFormTable").appendChild(newBookFormTableRow);
}

function creatNewRowHeader(header, number) {
  const newBookFormTableRowHeader = document.createElement("th");
  newBookFormTableRowHeader.textContent = header;
  const row = document.getElementById("newBookFormTableRow" + number);
  row.appendChild(newBookFormTableRowHeader);
}

function createNewRowInput(property, bookProperty, number, bookToEdit) {
  const newBookFormTableRowData = document.createElement("td");
  const row = document.getElementById("newBookFormTableRow" + number);
  row.appendChild(newBookFormTableRowData);
  const newBookFormTableRowDataInput = document.createElement("input");
  newBookFormTableRowDataInput.setAttribute("type", "text");
  newBookFormTableRowDataInput.setAttribute("id", "newBook" + property);
  newBookFormTableRowDataInput.setAttribute(
    "value",
    bookToEdit?.[bookProperty] || ""
  );
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

  // REFACTORED
  [1, 2, 3, 4].forEach((item) => {
    creatNewRow(item);
  });

  const rowHeaderArray = ["Title", "Author", "Number of Pages", "Read?"];
  for (let n = 0; n < rowHeaderArray.length; n++) {
    const i = n + 1;
    creatNewRowHeader(rowHeaderArray[n], i);
  }
  // lowerCase doesn't work sadly!
  const propertyArray = ["Title", "Author", "Npages"];
  const BookpropertyArray = ["title", "author", "nPages"];
  propertyArray.forEach((element, index) => {
    const number = index + 1;
    const BookProperty = BookpropertyArray[index];
    console.log(element, BookProperty, number, bookToEdit);
    createNewRowInput(element, BookProperty, number, bookToEdit);
  });

  const newBookFormTableRow4 = document.getElementById(
    "newBookFormTableRow" + 4
  );
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
      // const bookProperties = ["title", "author", "nPages"];
      // for (const element of bookProperties) {
      //   const input = "newBook" + element;
      //   library[bookToEdit.id].element = document.getElementById(input).value;
      // }
      // console.log(library[bookToEdit.id].title);
      bookToEdit.title = document.getElementById("newBookTitle").value;
      bookToEdit.author = document.getElementById("newBookAuthor").value;
      bookToEdit.nPages = document.getElementById("newBookNpages").value;
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
        document.getElementById("newBookTitle").value,
        document.getElementById("newBookAuthor").value,
        document.getElementById("newBookNpages").value,
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
    const bookDataNPages = document.createElement("td");
    bookDataNPages.textContent = book.nPages;
    bookRow.appendChild(bookDataNPages);
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
