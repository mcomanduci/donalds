'use client';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const OrderHeader = () => {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <Button size="icon" variant="ghost" className="mb-4 p-0" onClick={handleBack}>
      <ChevronLeftIcon />
    </Button>
  );
};

export default OrderHeader;
