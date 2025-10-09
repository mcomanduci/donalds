import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/helpers/format-currency';

import { CartContext, CartProduct } from '../contexts/cart';

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, addProduct } = useContext(CartContext);
  return (
    <div className="mb-4 flex gap-4">
      <div className="relative size-19 shrink-0 rounded-xl bg-[#EBEBEB]">
        <Image src={product.imageUrl} alt={product.name} className="object-contain" fill />
      </div>
      <div className="flex-1 space-y-1 overflow-hidden">
        <h2 className="truncate text-xs">{product.name}</h2>
        <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
        <div className="mt-1 flex items-center gap-2 text-center">
          <Button
            variant="outline"
            className="size-8 rounded-lg"
            onClick={() => decreaseProductQuantity(product.id)}
          >
            {product.quantity === 1 ? <TrashIcon /> : <ChevronLeftIcon />}
          </Button>
          <p className="w-6 text-sm">{product.quantity}</p>
          <Button
            variant="destructive"
            className="size-8 rounded-lg"
            onClick={() => addProduct({ ...product, quantity: 1 })}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
