import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StatisticeRepo {
  async gettotalPurchasesPerProductAndYear() {
    return await prisma.order.groupBy({
      by: ["books", { year: "order_date" }],
      _sum: {
        total_cost: true,
      },
    });
  }

  async buyersPerLocation() {
    return await prisma.order.groupBy({
      by: ["users.city", "users.country"],
      _count: {
        distinct: true,
        users: true,
      },
    });
  }

  async getTopThreeProductsLastSixMonths() {
    return await prisma.order.findMany({
      where: {
        order_date: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        },
      },
      select: {
        book_id_fk: true,
      },
    });
}

  async productTypesNeverPurchased() {
    return await prisma.catagory.findMany({
      where: {
        bookcatagory: {
          none: {
            orders: {},
          },
        },
      },
    });
  }

  async totalRevenuePerYear() {
    return await prisma.order.groupBy({
      by: { year: "order_date" },
      _sum: {
        total_cost: true,
      },
    });
  }

  async averagePurchaseAmountPerUser() {
    return await prisma.order.groupBy({
      by: ["users"],
      _avg: {
        total_cost: true,
      },
    });
  }
}

export default new StatisticeRepo();
