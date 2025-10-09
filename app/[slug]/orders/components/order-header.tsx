'use client';
import { ChevronLeftIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const OrderHeader = () => {
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const link = `/${slug}/menu?consumptionMethod=${searchParams.get('consumptionMethod')}`;
  const handleBack = () => router.push(link);

  return (
    <Button size="icon" variant="ghost" className="mb-4 p-0" onClick={handleBack}>
      <ChevronLeftIcon />
    </Button>
  );
};

export default OrderHeader;
