import { PrismaClient } from "@prisma/client";
import { subMonths } from "date-fns";

const prisma = new PrismaClient();
const sixMonthsAgo = subMonths(new Date(), 6);

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

  async topThreeProducts() {
    return await prisma.order.groupBy({
      by: ["books"],
      where: {
        order_date: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        orders: true,
      },
      orderBy: {
        orders: "desc",
      },
      take: 3,
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
