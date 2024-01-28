import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

prisma
	.$connect()
	.then(() => {
		console.log("Prisma is Connected");
	})
	.catch((err) => {
		prisma.$disconnect();
		console.log("Prisma disconnected");
		process.exit(1);
	});
export { prisma };
