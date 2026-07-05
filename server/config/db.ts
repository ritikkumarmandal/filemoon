import prisma from "../lib/prisma";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed", error);
    process.exit(1);
  }
};