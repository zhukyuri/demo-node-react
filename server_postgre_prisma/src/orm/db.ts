import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

type GlobalPrismaClientType = typeof global & { db?: PrismaClient };

if (process.env.NODE_ENV === "prod") {
  db = new PrismaClient();
} else {
  const newGlobals = global as GlobalPrismaClientType;
  if (!newGlobals.db) {
    newGlobals.db = new PrismaClient();
  }
  db = newGlobals.db;
}

export default db;
