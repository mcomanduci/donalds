import { Prisma } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/helpers/format-currency';

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: { select: { name: true; avatarImageUrl: true } };
      orderProducts: { include: { product: true } };
    };
  }>[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-6">
      <Button size="icon" variant="ghost" className="mb-4 p-0">
        <ChevronLeftIcon />
      </Button>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>

      {orders.map((order) => (
        <Card key={order.id} className="p-0">
          <CardContent className="space-y-4 px-5 py-4">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${order.status === 'PENDING' && 'bg-gray-100 text-gray-500'} ${order.status === 'IN_PREPARATION' && 'bg-yellow-500 text-white'} ${order.status === 'FINISHED' && 'bg-green-500 text-white'}`}
            >
              {order.status === 'PENDING' && 'Pendente'}
              {order.status === 'IN_PREPARATION' && 'Em Preparo'}
              {order.status === 'FINISHED' && 'Finalizado'}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative size-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  className="rounded-lg"
                  fill
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-xs">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">{formatCurrency(order.total)}</p>
              <Button variant="link" className="text-destructive p-0 text-xs font-medium">
                Adicionar à Sacola
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
