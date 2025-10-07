import React from 'react';

import PageNotFound from '@/components/page-not-found';
import { getRestaurantBySlug } from '@/data/restaurant';

import Categories from './component/categories';
import RestaurantHeader from './component/restaurant-header';

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod?: string }>;
}

const isConsumptionMethodValid = (consumptionMethod?: string) => {
  return (
    typeof consumptionMethod === 'string' &&
    ['DINE_IN', 'TAKEAWAY'].includes(consumptionMethod.toUpperCase())
  );
};

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return <PageNotFound />;
  }

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return <PageNotFound />;
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <Categories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
