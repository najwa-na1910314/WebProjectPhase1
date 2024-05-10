import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsersRepo {
  async getUsers() {
    return await prisma.userAccount.findMany(); // get all users from the db
  }

  async getUserById(user_id) {
    // get user info by its id
    return await prisma.userAccount.findUnique({
      where: { user_id: user_id },
    });
  }

  async getOrders() {
    return await prisma.order.findMany();
  }

  async getOrderByBookId(book_id) {
    // orders for a spec book
    // book_id to be used for seller order history
    return await prisma.order.findMany({
      where: { book_id_fk: book_id },
    });
  }

  async getOrderByUserId(user_id) {
    // orders for a spec book
    // user_id to be used for customer order history
    return await prisma.order.findMany({
      where: { user_id_fk: user_id },
    });
  }

  async addOrder(order){
    return await prisma.order.create({
      data: order
    })
  }
}


export default new UsersRepo();
