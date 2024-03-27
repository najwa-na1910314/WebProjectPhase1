const booksArea = document.querySelector("#books-list");

function toHtml(book) {
    return `
        <div class="book-card">
            <img src="${book.thumbnailUrl}" class="card-img"/>
            <div class="description">
                <h1>${book.title}</h1>
                <hr />
                <h2>Description</h2>
                <p class="instructions">
                    ${book.shortDescription}
                </p>
            </div>
            <div class="action-btns">
                <button class="remove-button" onclick="deleteBook(${book._id})"><i class="fa fa-trash">Remove</i></button>
                <button class="update-button" onclick="updateBookByISBN('${book.isbn}')"><i class="fa fa-pencil"> Update </i></button>
            </div>
        </div>
    `;
}

async function fetchData() {
    try {
        const response = await fetch('books.json');
        const data = await response.json();
        localStorage.setItem('booksData', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function displayBooks() {
    const storedBooks = localStorage.getItem('booksData');
    let books = [];
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    } else {
        books = await fetchData();
    }

    booksArea.innerHTML = books.map(book => toHtml(book)).join('');
}

// Call displayBooks() to populate books on page load
displayBooks();
