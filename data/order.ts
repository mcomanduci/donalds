import { removeCpfPontuaction } from '@/helpers/cpf';
import { db } from '@/lib/prisma';

export const getOrders = (cpf: string) =>
  db.order.findMany({
    where: {
      customerCpf: removeCpfPontuaction(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
