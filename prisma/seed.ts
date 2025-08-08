import { PrismaClient } from "../src/generated/prisma";

import { dataSeliya } from "../src/data/seliya";

const prisma = new PrismaClient();

async function main() {
  for (const seedSeliya of dataSeliya) {
    const seliya = await prisma.condiment.upsert({
      where: { id: seedSeliya.id },
      update: {},
      create: {
        name: seedSeliya.name,
        spicy: seedSeliya.spicy,
      },
    });

    console.log(`Seliya: ${seliya.name}`);
  }
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
