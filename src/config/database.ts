import { PrismaClient as MongoClient } from '@prisma_config/generated/mongodb';
import { PrismaClient as PostgreClient } from '@prisma_config/generated/postgresql';

let mongoClient: MongoClient;
function connectMongoClient(): void {
  mongoClient = new MongoClient();
}

async function disconnectMongoClient(): Promise<void> {
  await mongoClient?.$disconnect();
}

let postgreClient: PostgreClient;
function connectPostgreDB(): void {
  postgreClient = new PostgreClient();
}

async function disconnectPostgreDB(): Promise<void> {
  await postgreClient?.$disconnect();
}

export { disconnectPostgreDB, connectPostgreDB, postgreClient, disconnectMongoClient, connectMongoClient, mongoClient };
