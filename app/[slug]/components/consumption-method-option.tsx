import { ConsumptionMethod } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ConsumptionMethodOptionProps {
  image: string;
  alt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({
  image,
  alt,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col items-center gap-8 px-3 pt-8 pb-3">
        <div className="relative size-[80px]">
          <Image src={image} alt={alt} fill className="object-contain" />
        </div>
        <Button
          variant="secondary"
          className="w-full rounded-full px-[14px] text-xs font-semibold"
          size="lg"
          asChild
        >
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
