import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function main() {
  //   await prisma.user.create({
  //     data: {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //       posts: {
  //         create: { title: 'Hello World' },
  //       },
  //     },
  //   });
  //   const allUsers = await prisma.user.findMany({
  //     include: {
  //       posts: true,
  //     },
  //   });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
