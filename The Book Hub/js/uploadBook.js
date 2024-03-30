document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.books) {
        await fetchBooks();
    } else {
        showBooks();
    }

    const addBooksForm = document.querySelector("#add_book_form");

    addBooksForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const book = formToObject(e.target);
        books.unshift(book);
        localStorage.books = JSON.stringify(books);
        showBooks();
        addBooksForm.reset();
    });
});

let books = []; // empty array to store added books

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

async function fetchBooks() {
    try {
        const response = await fetch("json/books.json");
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        books = await response.json();
        console.log(books);

        books.forEach((book) => {
            document.getElementById("books").innerHTML += toHTML(book);
        });

        localStorage.books = JSON.stringify(books);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

function showBooks() {
    books = JSON.parse(localStorage.books);
    const booksHTML = books.map((book) => toHTML(book)).join("");
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
    <h2>Sell a Book:</h2>
    <form id="add_book_form">
        <div class="grid-container">
            <label for="price">Price:</label>
            <input type="text" id="price" placeholder="Enter Price" required />
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" placeholder="Enter Quantity" required />
            <label for="isbn">isbn:</label>
            <input type="text" id="isbn" placeholder="Enter Book isbn" required />
            <label for="title">Title:</label>
            <input type="text" id="title" placeholder="Enter Book Name" required />
            <label for="categories">categories:</label>
            <input type="text" id="categories" placeholder="Enter Book categories" required />
            <label for="status">status:</label>
            <input type="text" id="status" placeholder="Enter Book status" required />
            <label for="image">Image:</label>
            <input type="text" id="image" placeholder="Enter Image URL" required />
            <input type="submit" value="Add Book" id="add" />
        </div>
    </form>
    `;
}

async function buyBook(bookId) {
    const purchasePageUrl = "bookDetails.html";
    if (localStorage.getItem("user_data") != null) {
        // Redirect to the purchase page
        window.location.href = purchasePageUrl + "?bookId=" + bookId;
    } else {
        console.log("You are not logged in.");
    }
}
