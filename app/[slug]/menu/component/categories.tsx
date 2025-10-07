'use client';
import { MenuCategory, Prisma } from '@prisma/client';
import { ClockIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
  const handleCategorySelect = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return category.id === selectedCategory.id ? 'default' : 'outline';
  };

  return (
    <>
      <div className="relative z-50 mt-[-3rem] rounded-t-3xl border bg-white p-5">
        <div className="flex items-center gap-3">
          <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45} />
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
        <ScrollBar orientation="horizontal" />
        <ScrollArea className="w-full pl-5">
          <div className="flex w-max space-x-4">
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
      </ScrollArea>
      <Products products={selectedCategory.products} />
    </>
  );
};

export default RestaurantCategories;
