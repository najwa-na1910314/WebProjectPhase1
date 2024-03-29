document.addEventListener('DOMContentLoaded', async () => {
  
    if(!localStorage.books)
        await fetchBooks()
    else
        showBooks()
})

document.querySelector('.search-button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    const searchQuery = document.querySelector('.search-box').value.toLowerCase();
    filterBooks(searchQuery);
});

let books = [] //empty array to store added books

async function loadPage(pageUrl){
    await page(pageUrl)
}


function formToObject(form) {
    const formData =  new FormData(form) 
    const data = {}

    for(const [key, value] of formData){
        data[key] =  value 
    }
    return data;
}

async function fetchBooks(){
    try {
        const response = await fetch('data/books.json'); 
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        books = await response.json();
        console.log(books);

        books.forEach((book) => {
            document.querySelector(".books").innerHTML += toHTML(book);
        });

        localStorage.books = JSON.stringify(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function showBooks() {
    books = JSON.parse(localStorage.books);
    const booksHTML = books.map((r) => toHTML(r)).join(' ');
    document.querySelector(".books").innerHTML = booksHTML; 
}

async function page(pageUrl) {
    const mainContent = document.getElementById("main-content");
    const page = await fetch(pageUrl);
    const pageHTMLContent = await page.text();
    mainContent.innerHTML = pageHTMLContent;
}

function toHTML(book) {
    return `
        <div class="book-card">
        <img src="${book.thumbnailUrl}" class="card-image"></img>
        <h7>Title: ${book.title}</h7>
        <br>
        <h7>Author(s): ${book.authors}</h7>
        <br>
        <h7>Status: ${book.status}</h7>
        <br>
        <h7>Price: ${book.price}$</h7>
        </div>
    `
}

