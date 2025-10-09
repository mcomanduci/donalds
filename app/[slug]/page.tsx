import Image from 'next/image';

import PageNotFound from '@/components/page-not-found';
import { getRestaurantBySlug } from '@/data/restaurant';

import ConsumptionMethodOption from './components/consumption-method-option';

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return <PageNotFound />;
  }

  return (
    <div className="flex h-screen flex-col items-center px-6 pt-19">
      {/* LOGO E TITULO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
          className="rounded-lg"
        />
        <h2 className="font-semibold">{restaurant?.name}</h2>
      </div>
      {/* BEM VINDO */}
      <div className="space-y-3 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="text-sm opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e
          sabor em cada detalhe!
        </p>
      </div>
      {/* Imagens */}
      <div className="grid grid-cols-2 gap-6 pt-15">
        <ConsumptionMethodOption
          image="./dine-in.svg"
          alt="Comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          image="./take-away.svg"
          alt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;