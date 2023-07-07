import { PrismaClient as MongoClient } from '@prisma_config/generated/mongodb';
import { PrismaClient as PostgreClient } from '@prisma_config/generated/postgresql';

export let mongoClient: MongoClient;
export function connectMongoClient(): void {
  mongoClient = new MongoClient();
}

export async function disconnectMongoClient(): Promise<void> {
  await mongoClient?.$disconnect();
}

export let postgreClient: PostgreClient;
export function connectDb(): void {
  postgreClient = new PostgreClient();
}

export async function disconnectDB(): Promise<void> {
  await postgreClient?.$disconnect();
}
