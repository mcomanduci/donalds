import { useContext } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { CartContext } from '../contexts/cart';
import CartItem from './cart-item';

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%] max-w-[400px] px-5">
        <SheetHeader className="px-0">
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
