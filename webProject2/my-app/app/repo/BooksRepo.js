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
    const books = await prisma.book.findMany({
      where: {
        bookAuthor: {
          some: {
            author_id_fk: author.author_id,
          },
        },
      },
    });
    //console.log(books);
    return books;
  }

  async getBooksByCategory(category) {
    if (!category || typeof category !== "string") {
      throw new Error("Category not found");
    }
    const bookCat = await prisma.catagory.findFirst({
      where: {
        catagory_name: category,
      },
    });
    const books = await prisma.book.findMany({
      where: {bookcatagory: {
        some:{
          catagory_id_fk: bookCat.catagory_id
        }
      }}
    })
    //console.log(books);
    return books;
  }

  async updateBook(book_id, updatedBook) {
    console.log(updatedBook);
    
    return prisma.book.update({
      data: updatedBook,
      where: {
        book_id: book_id,
      },
    });
  }

  async addBook(book){
    return await prisma.book.create({
      data: book
    })
  }
}

export default new BooksRepo();
