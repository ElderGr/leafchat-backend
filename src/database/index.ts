import { createConnections } from "typeorm";

export default async function connect() {
  await createConnections();

  console.log(`Database connected`)
}
