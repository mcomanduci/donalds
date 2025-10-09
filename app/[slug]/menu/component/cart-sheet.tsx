import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatCurrency } from '@/helpers/format-currency';

import { CartContext } from '../contexts/cart';
import CartItem from './cart-item';
import FinishOrderDialog from './finish-order-dialog';

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex w-[85%] max-w-[400px] flex-col gap-0 px-5">
        <SheetHeader className="px-0">
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>

        {/* Scrollable products area */}
        <ScrollArea className="flex-1 overflow-hidden pr-4">
          <div className="space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        </ScrollArea>

        {/* Fixed bottom section */}
        <div className="mt-4 flex flex-col gap-4 pb-5">
          <Card className="flex justify-between p-4">
            <CardContent className="w-full space-y-2 p-0">
              <div className="flex w-full justify-between border-b pb-2 text-xs">
                <p className="opacity-60">Subtotal</p>
                <p>{formatCurrency(total)}</p>
              </div>
              <div className="flex w-full justify-between border-b pb-2 text-xs">
                <p className="opacity-60">Descontos</p>
                <p>{formatCurrency(0)}</p>
              </div>
              <div className="flex w-full justify-between text-sm font-semibold">
                <p>Total</p>
                <p>{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button
            size="lg"
            className="w-full rounded-full"
            onClick={() => setFinishOrderDialogIsOpen(true)}
          >
            Finalizar pedido
          </Button>
          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={() => setFinishOrderDialogIsOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
