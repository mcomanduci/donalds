import PageNotFound from '@/components/page-not-found';
import { getProductById } from '@/data/products';

import ProductDetails from './components/product-details';
import ProductHeader from './components/product-header';

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return <PageNotFound />;
  }

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return <PageNotFound />;
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
