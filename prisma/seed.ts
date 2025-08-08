import { PrismaClient } from "../src/generated/prisma";
import { prisma } from "../src/lib/prisma";

async function main() {
  // TODO: Implement seed products
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
