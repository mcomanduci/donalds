import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

const OrderItem = () => {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="w-fit rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">
          Em preparo
        </div>
        <div className="flex items-center gap-3">
          <div className="relative size-5"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
