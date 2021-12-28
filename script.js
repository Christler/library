const container = document.querySelector(".container")
const table = document.querySelector("tbody")
const newBookForm = document.querySelector(".newBookForm")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#numPages")
const readInput = document.querySelector("#read")
const newBookBtn = document.querySelector(".newBookBtn");
const closeModal = document.getElementsByClassName("close")[0];
const modal = document.querySelector(".modal");
let myLibrary = [];

/*MODAL STUFF*/
// When the user clicks on the New Book button, open the modal
newBookBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

function Book(title, author, numPages, read){
  this.title = title
  this.author = author
  this.numPages = numPages
  this.read = read
}

Book.prototype.info = function(){
    let info = [this.title, this.author, this.numPages, this.read]
    return info
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  showBooks()
}

function showBooks(){
  //clear table first
  table.innerHTML = ""
  
  myLibrary.forEach((book, i) => {
    //create a row and give a data index for each row
    let row = document.createElement("tr")
    row.setAttribute("data-index-number", i)
    
    let info = book.info()
    let remove = document.createElement('td')
    let title = document.createElement('td')
    let author = document.createElement('td')
    let pages = document.createElement('td')
    let read = document.createElement('td')
    
    let removeBtn = document.createElement('div')
    removeBtn.innerHTML = `<span style="color: Tomato;">
                                <i class="fas fa-trash-alt"></i>
                           </span>`
    removeBtn.addEventListener("click", removeBook)
    
    let checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.setAttribute('class', 'form-check-input')
    checkBox.addEventListener("click", toggleRead)
    
    title.innerText = info[0]
    author.innerText = info[1]
    pages.innerText = info[2]
    checkBox.checked = info[3]
    
    remove.appendChild(removeBtn)
    read.appendChild(checkBox)
    
    row.appendChild(remove)
    row.appendChild(title)
    row.appendChild(author)
    row.appendChild(pages)
    row.appendChild(read)
    
    table.appendChild(row)
  })
}

function removeBook(e){
  let elementIndex = e.srcElement.parentElement.parentElement.dataset.indexNumber
  myLibrary.splice(elementIndex, 1)
  showBooks()
}

function toggleRead(e){
  let elementIndex = e.srcElement.parentElement.parentElement.dataset.indexNumber
  myLibrary[elementIndex].read = e.srcElement.checked
}

function validateForm(){
  let title = titleInput.value
  let author = authorInput.value
  let pages = pagesInput.value
  let read = readInput.checked
  
  if(title === "" || author === "" || pages === ""){
    //alert("Please fill out required fields")
  }else{
    //if input good add book to library and clear form
    let book = new Book(title, author, pages, read)
    addBookToLibrary(book)
    clearForm()
  }
}

function clearForm(){
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    readInput.checked = false
    modal.style.display = "none";
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true)
addBookToLibrary(theHobbit)
const fightClub = new Book("Fight Club", "Chuck Palahniuk", 160, false)
addBookToLibrary(fightClub)

showBooks()