import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsersRepo{
  async getUsers() {
    return await prisma.userAccount.findMany(); // get all users from the db
  }

  async getUserById(user_id){ // get user info by its id
    return await prisma.userAccount.findUnique({
        where: {user_id: user_id}
    })
  }
}



export default new UsersRepo();