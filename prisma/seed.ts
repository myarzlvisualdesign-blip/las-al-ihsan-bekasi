import { prisma } from "@/lib/prisma";
import { seedCms } from "@/lib/cms/seed";

async function main() {
  await seedCms(prisma);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
