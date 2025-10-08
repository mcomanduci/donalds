import { db } from '@/lib/prisma';

export const getProductById = async (productId: string) => {
  return await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });
};
