'use client';

import { Product } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';

import { CartContext } from '../../contexts/cart';

interface ProductHeaderProps {
  product: Pick<Product, 'name' | 'imageUrl'>;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();
  const handleBack = () => router.back();
  const { toggleCart } = useContext(CartContext);

  return (
    <div className="relative max-h-[250px] min-h-[250px] w-full bg-[#EBEBEB]">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-10 rounded-full bg-white"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      <Image src={product.imageUrl} alt={product.name} fill className="object-contain" priority />
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-10 rounded-full bg-white"
        onClick={toggleCart}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
