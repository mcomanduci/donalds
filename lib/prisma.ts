import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const createPrismaClient = () => new PrismaClient().$extends(withAccelerate());

declare global {
  var cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
}

let prisma: ReturnType<typeof createPrismaClient>;
if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
