import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link href="#" key={product.id} className="flex items-center justify-between gap-15 py-3">
          <div>
            <h3 className="pb-0.5 text-xs">{product.name}</h3>
            <p className="text-muted-foreground line-clamp-2 text-xs">{product.description}</p>
            <p className="pt-3 text-sm font-semibold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                product.price,
              )}
            </p>
          </div>
          <div className="bg-accent relative min-h-[82px] min-w-[82px] rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
