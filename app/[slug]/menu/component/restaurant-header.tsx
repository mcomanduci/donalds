'use client';
import { Restaurant } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';

import { CartContext } from '../contexts/cart';
import CartSheet from './cart-sheet';

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const handleBack = () => router.back();
  const { toggleCart } = useContext(CartContext);

  return (
    <>
      <div className="relative h-[250px] w-full">
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 z-10 rounded-full"
          onClick={handleBack}
        >
          <ChevronLeftIcon />
        </Button>
        <Image
          src={restaurant?.coverImageUrl}
          alt={restaurant?.name}
          fill
          className="object-cover"
          priority
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 z-10 rounded-full"
          onClick={toggleCart}
        >
          <ScrollTextIcon />
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default RestaurantHeader;
