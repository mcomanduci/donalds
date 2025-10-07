import { db } from '@/lib/prisma';

export const getRestaurantBySlug = async (slug: string) =>
  await db.restaurant.findUnique({
    where: { slug },
  });
