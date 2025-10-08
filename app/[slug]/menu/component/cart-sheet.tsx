import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatCurrency } from '@/helpers/format-currency';

import ButtonsQuantity from '../[productId]/components/buttons-quantity';
import { CartContext } from '../contexts/cart';

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="min-w-[350px] px-5">
        <SheetHeader className="px-0">
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        {products.map((product) => (
          <div key={product.id} className="mb-4 flex gap-4">
            <div className="shrink-0 rounded-xl bg-[#EBEBEB]">
              <Image src={product.imageUrl} alt={product.name} width={77} height={77} />
            </div>
            <div className="space-y-1 overflow-hidden">
              <h2 className="truncate text-xs">{product.name}</h2>
              <p className="text-sm font-semibold">
                {product.quantity}x {formatCurrency(product.price)}
              </p>
              <ButtonsQuantity
                quantity={product.quantity}
                handleDecreaseQuantity={() => {}}
                handleIncreaseQuantity={() => {}}
              />
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="rounded-xl">
                <TrashIcon />
              </Button>
            </div>
          </div>

          // <h1 key={product.id}>
          //   {product.name} - {product.quantity}
          // </h1>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
