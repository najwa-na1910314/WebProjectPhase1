import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthorsRepo {
  async getAuthors() {
    return await prisma.author.findMany(); // get all authors from the db
  }

  async getAuthorById(author_id){ // get author info by its id
    return await prisma.author.findUnique({
        where: {author_id: author_id}
    })
  }
}

export default new AuthorsRepo();
