'use client';
import { Product } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';

interface CartProduct extends Pick<Product, 'id' | 'name' | 'imageUrl' | 'price'> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => {
      const productIsAlreadyInCart = prev.find((p) => p.id === product.id);
      if (productIsAlreadyInCart) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p,
        );
      }
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider
      value={{ isOpen: isOpen, products: products, toggleCart: toggleCart, addProduct: addProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};
