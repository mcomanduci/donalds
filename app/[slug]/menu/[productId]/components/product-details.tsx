'use client';

import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/helpers/format-currency';

import CartSheet from '../../component/cart-sheet';
import { CartContext } from '../../contexts/cart';
import ButtonsQuantity from './buttons-quantity';

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true; avatarImageUrl: true };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleAddToCart = () => {
    addProduct({ ...product, quantity });
    setTimeout(() => setQuantity(1), 500);
    toggleCart();
  };

  return (
    <>
      <div className="bg-background relative z-50 -mt-5 flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-1">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              className="rounded-full"
              width={16}
              height={16}
              priority
            />
            <p className="text-xs opacity-50">{product.restaurant.name}</p>
          </div>

          <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>
          <div className="mt-2 flex items-center justify-between">
            <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>

            <ButtonsQuantity
              quantity={quantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
            />
          </div>

          <ScrollArea className="h-full pb-2">
            <ScrollBar orientation="horizontal" className="hidden md:flex" />

            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold">Sobre</h4>
              <p className="text-sm opacity-60">{product.description}</p>
            </div>

            {product.ingredients.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-semibold">Ingredientes</h4>
                </div>
                <ul>
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient} className="text-sm opacity-60">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ScrollArea>
        </div>
        <Button className="mt-2 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
