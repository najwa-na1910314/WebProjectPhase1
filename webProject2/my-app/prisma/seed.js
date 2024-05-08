import fs from 'fs-extra'
import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const authorsPath = path.join(process.cwd(), 'app/data/authors.json')
const booksPath = path.join(process.cwd(), 'app/data/books.json')
const usersPath = path.join(process.cwd(), 'app/data/users.json')
const categoryPath = path.join(process.cwd(), 'app/data/category.json')
const shippingPath = path.join(process.cwd(), 'app/data/shipping.json')
const bankPath = path.join(process.cwd(), 'app/data/bank.json')
const orderPath = path.join(process.cwd(), 'app/data/order.json')
const bookCategoryPath = path.join(process.cwd(), 'app/data/bookCategory.json')
const bookAuthorPath = path.join(process.cwd(), 'app/data/bookAuthor.json')


async function main() {
    try {
        const authors = await fs.readJSON(authorsPath)
        const books = await fs.readJSON(booksPath)
        const users = await fs.readJSON(usersPath)
        const categories = await fs.readJSON(categoryPath)
        const shippings = await fs.readJSON(shippingPath)
        const banks = await fs.readJSON(bankPath)
        const orders = await fs.readJSON(orderPath)
        const bookCategories = await fs.readJSON(bookCategoryPath)
        const bookAuthors = await fs.readJSON(bookAuthorPath)

        await prisma.bookAuthor.deleteMany({})
        await prisma.bookCatagory.deleteMany({})
        await prisma.order.deleteMany({})
        await prisma.bankAccount.deleteMany({})
        await prisma.shipping.deleteMany({})

        await prisma.author.deleteMany({})
        await prisma.book.deleteMany({})
        await prisma.userAccount.deleteMany({})
        await prisma.catagory.deleteMany({})

        for (const author of authors){
            await prisma.author.create({ data: author })
        }

        for (const book of books){
            await prisma.book.create({ data: book })
        }

        for (const user of users){
            await prisma.userAccount.create({ data: user })
        }

        for (const category of categories){
            await prisma.catagory.create({ data: category })
        }

        for (const shipping of shippings){
            await prisma.shipping.create({ data: shipping })
        }

        for (const bank of banks){
            await prisma.bankAccount.create({ data: bank })
        }

        for (const order of orders){
            await prisma.order.create({ data: order })
        }
        for (const bookCategory of bookCategories){
            await prisma.bookCatagory.create({ data: bookCategory })
        }
        for (const bookAuthor of bookAuthors){
            await prisma.bookAuthor.create({ data: bookAuthor })
        }
        console.log("Successfully seeded");

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })