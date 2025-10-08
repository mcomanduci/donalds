import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface ButtonsQuantityProps {
  quantity: number;
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
}

const ButtonsQuantity = ({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}: ButtonsQuantityProps) => {
  return (
    <div className="flex items-center gap-3 text-center">
      <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
        <ChevronLeftIcon />
      </Button>
      <p className="w-4">{quantity}</p>
      <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default ButtonsQuantity;
