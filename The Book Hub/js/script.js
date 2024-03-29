document.addEventListener("DOMContentLoaded", async () => {
  //completed

  if (!localStorage.books) {
    await fetchBooks();
  } else {
    showBooks();
  }
});
document.querySelector(".search-button").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
  const searchQuery = document.querySelector(".search-box").value.toLowerCase();
  if (searchQuery !== null || searchQuery !== "") {
    console.log("reset booklist");
    filterBooks(searchQuery);
  }
  else{
    window.location.href= "index.html"
  }
  
});
async function filterBooks(searchQuery) {

  let booklist = localStorage.getItem("books");
  if (booklist != null) {
    booklist = JSON.parse(localStorage.getItem("books"));
    let result = booklist.filter((book) =>
      book["title"].toLowerCase().includes(searchQuery)
    );
    console.log(result)
    await showFilteredBooks(result)
   // localStorage.setItem( "filteredlist", JSON.parse(result))
  } else {
    console.log("booklist not found");
  }
}
async function showFilteredBooks(booklist){
    let ele = document.querySelector(".books").innerHTML;
    ele = "hi"
  /*  booklist.forEach(book => {
        ele += toHTML(book)
    });*/
}
let books = []; //empty array to store added books

async function loadPage(pageUrl) {
  await page(pageUrl);
}

function formToObject(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }
  return data;
}
//completed
async function fetchBooks() {
  try {
    const response = await fetch("json/books.json");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    books = await response.json();
    console.log(books);

    books.forEach((book) => {
      document.querySelector(".books").innerHTML += toHTML(book);
    });

    localStorage.books = JSON.stringify(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function showBooks() {
  books = JSON.parse(localStorage.books);
  const booksHTML = books.map((r) => toHTML(r)).join(" ");
  document.querySelector(".books").innerHTML = booksHTML;
}

async function page(pageUrl) {
  const mainContent = document.getElementById("main-content");
  const page = await fetch(pageUrl);
  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;
}

async function buyBook(title) {
  const purchasePageUrl = "../../Purchase Item/purchase.html";

  // Redirect to the purchase page
  window.location.href = purchasePageUrl; //not working
}

function toHTML(book) {
  return `
        <div class="book-card">
        <img src="${book.thumbnailUrl}" class="card-image"></img>
        <h7>Title: ${book.title}</h7>
        <br>
        <h7>Author(s): ${book.authors}</h7>
        <br>
        <h7>Price: ${book.price}$</h7>
        <br>
        <button onclick="buyBook('${book.title}')">BUY NOW</button>
        </div>
    `;
}
