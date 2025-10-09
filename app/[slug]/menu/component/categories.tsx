'use client';
import { Prisma } from '@prisma/client';
import { ClockIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/helpers/format-currency';

import { CartContext } from '../contexts/cart';
import Products from './products';

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(
    restaurant.menuCategories[0],
  );
  const { products, total, toggleCart } = useContext(CartContext);
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const handleCategorySelect = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return category.id === selectedCategory.id ? 'default' : 'outline';
  };

  return (
    <>
      <div className="relative z-50 mt-[-3rem] rounded-t-3xl border-b border-solid bg-white p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
            priority
          />
          <div className="">
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="-mr-5 w-full p-5 px-0">
        <ScrollBar orientation="horizontal" className="hidden md:flex" />
        <div className="flex w-max space-x-4 px-5">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className={`rounded-full border text-xs font-semibold ${category.id !== selectedCategory.id && 'text-muted-foreground font-normal'}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <Products products={selectedCategory.products} />
      {products.length > 0 && (
        <div className="fixed right-0 bottom-0 left-0 flex w-full items-center justify-between border-t bg-white px-5 py-3">
          <div>
            <p className="text-muted-foreground text-xs">Total dos pedidos</p>
            <p className="font-semibold">
              {formatCurrency(total)}{' '}
              <span className="text-muted-foreground text-xs font-normal">
                / {totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'}
              </span>
            </p>
          </div>
          <Button className="rounded-lg" size="lg" onClick={toggleCart}>
            Ver Sacola
          </Button>
        </div>
      )}
    </>
  );
};

export default RestaurantCategories;
