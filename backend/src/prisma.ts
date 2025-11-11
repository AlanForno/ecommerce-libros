import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
// Cerrar la conexión ordenadamente al finalizar el proceso
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});