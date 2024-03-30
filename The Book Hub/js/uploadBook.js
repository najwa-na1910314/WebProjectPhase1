document.addEventListener('DOMContentLoaded', () => {
    const sellContainer = document.querySelector(".sell_container");

    const formHTML = `
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

    sellContainer.innerHTML = formHTML;

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
