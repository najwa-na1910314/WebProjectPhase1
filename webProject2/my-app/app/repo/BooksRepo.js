//import path from 'path';
//import fs from 'fs-extra';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BooksRepo {
  async getBooks() {
    return await prisma.book.findMany(); // get all books from the db
  }

  async getBookById(book_id) {
    // get book info by its id
    return await prisma.book.findUnique({
      where: { book_id: book_id },
    });
  }

  async getBooksByName(bookName) {
    // for search in phase 1
    if (!bookName || typeof bookName !== "string") {
      throw new Error("Invalid book name");
    }
    return await prisma.book.findMany({
      where: { book_title: { contains: bookName.toLowerCase() } },
    });
  }

  async getBooksByAuthor(authorName) {
    if (!authorName || typeof authorName !== "string") {
      throw new Error("Author not found");
    }
    const author = await prisma.author.findFirst({
      where: {
        OR: [
          {
            first_name: authorName,
          },
          { last_name: authorName },
          {
            AND: [
              {
                first_name: authorName.split(" ")[0],
              },
              {
                last_name: authorName.split(" ")[1],
              },
            ],
          },
          {
            AND: [
              {
                first_name: authorName.split(" ")[1],
              },
              {
                last_name: authorName.split(" ")[0],
              },
            ],
          },
        ],
      },
    });
    /*const books = await prisma.book.findMany({
      where: { author_id: author.author_id },
    });
    return books;*/
  }

  /*async getBooksByName(bookName) {
    if (!bookName || typeof bookName !== "string") {
      throw new Error("Invalid book name");
    }
    return await prisma.book.findMany({
      where: { title: { contains: bookName.toLowerCase() } },
    });
  }

  async getBooksByPageCount(pageCount) {
    if (!Number.isInteger(Number(pageCount))) {
      throw new Error("Invalid page count");
    }
    return await prisma.book.findMany({
      where: { pageCount: { gte: parseInt(pageCount) } },
    });
  }

  async getBooksByAuthor(authorName) {
    if (!authorName || typeof authorName !== "string") {
      throw new Error("Author not found");
    }
    const author = await prisma.author.findFirst({
      where: {
        OR: [
          {
            first_name: authorName,
          },
          { last_name: authorName },
          {
            AND: [
              {
                first_name: authorName.split(" ")[0],
              },
              {
                last_name: authorName.split(" ")[1],
              },
            ],
          },
          {
            AND: [
              {
                first_name: authorName.split(" ")[1],
              },
              {
                last_name: authorName.split(" ")[0],
              },
            ],
          },
        ],
      },
    });
    const books = await prisma.book.findMany({
      where: { authorId: author.authorId },
    });
    return books;
  }

  async getBooksSummary() {
    let summary = await prisma.book.groupBy({
      by: ["authorId"],
      _count: true,
      _sum: { pageCount: true },
    });
    let authorIds = summary.map((item) => item.authorId);
    let authors = await prisma.author.findMany({
      where: {
        authorId: {
          in: authorIds,
        },
      },
      select: {
        authorId: true,
        first_name: true,
        last_name: true,
      },
    });
    let summaryWithNames = summary.map((item) => {
      let author = authors.find((author) => author.authorId === item.authorId);
      return {
        ...item,
        author: author
          ? { first_name: author.first_name, last_name: author.last_name }
          : null,
      };
    });
    return summaryWithNames;
  }

  async deleteBook(isbn) {
    let book = await prisma.book.findUnique({
      where: { isbn: isbn },
    });
    if (!book) {
      throw new Error("Book not found");
    }
    let deletedBook = await prisma.book.delete({
      where: {
        isbn: isbn,
      },
    });
    return deletedBook;
  }

  async getBookByISBN(isbn) {
    if (!isbn || typeof isbn !== "string") {
      throw new Error("Invalid ISBN");
    }
    return await prisma.book.findUnique({
      where: { isbn: isbn },
    });
  }

  async addBook(book) {
    return prisma.book.create({
      data: book,
    });
  }

  async updateBook(isbn, updatedBook) {
    return prisma.book.update({
      data: updatedBook,
      where: {
        isbn: isbn,
      },
    });
  }*/

  /*#booksFilePath = path.join(process.cwd(), 'app/data/catalog-books.json');

    async getBookByISBN(isbn) {
        if (!isbn || typeof isbn !== 'string') {
            throw new Error("Invalid ISBN");
        }
        const books = await this.getBooks();
        return books.find(book => book.isbn === isbn);
    }

    async getBookByISBN(isbn) {
        if (!isbn || typeof isbn !== 'string') {
            throw new Error("Invalid ISBN");
        }
        const books = await this.getBooks();
        const book = books.find(book => book.isbn === isbn);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }
    
    async addBook(book) {
        if (!book || typeof book !== 'object' || !book.title || !book.isbn) {
            throw new Error("Invalid book object");
        }
        const books = await this.getBooks();
        const maxId = books.reduce((max, b) => b.id > max ? b.id : max, 0);
        book.id = maxId + 1; // Assign the next available integer ID
        books.push(book);
        return await this.saveBooks(books) ? book : null;
    }

    async updateBook(isbn, updatedBook) {
        if (!isbn || typeof isbn !== 'string') {
            throw new Error("Invalid ISBN");
        }
        if (!updatedBook || typeof updatedBook !== 'object') {
            throw new Error("Invalid book data");
        }
        const books = await this.getBooks();
        const index = books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            books[index] = { ...books[index], ...updatedBook };
            return await this.saveBooks(books) ? books[index] : null;
        }
        throw new Error('Book not found');
    }

    async getBooksByCategory(bookCategory) {
        if (!bookCategory || typeof bookCategory !== 'string') {
            throw new Error("Invalid book category");
        }
        const books = await this.getBooks();
        return books.filter(book => book.categories.some(category => category.toLowerCase().includes(bookCategory.toLowerCase())));
    }

    async saveBooks(books) {
        await fs.writeJSON(this.#booksFilePath, books, { spaces: 2 });
        return books;
    }

    async cleanBooks() {
        const books = await this.getBooks();
        const cleanBooks = books.filter(book => book.shortDescription && book.shortDescription.length > 10);
        await this.saveBooks(cleanBooks);
    }*/
}

export default new BooksRepo();

// const repo = new BooksRepo();
// // const books = await repo.getBooks()

// // // add a new book
// // const book = books[0]
// // book.title = "new title"
// // book.isbn = '123adf123'
// // delete book.id
// // // console.log(book);

// try {
//     const response = await repo.getBookByISBN("935182455")
//     console.log(response);
// } catch (error) {
//     console.log(error);
// }
