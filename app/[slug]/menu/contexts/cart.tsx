'use client';
import { Product } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';

export interface CartProduct extends Pick<Product, 'id' | 'name' | 'imageUrl' | 'price'> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  removeProduct: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      if (existingProduct) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p,
        );
      }
      return [...prev, product];
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((p) => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0),
    );
  };

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => {
    setProducts([]);
    setIsOpen(false);
  };

  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products: products,
        total: total,
        toggleCart: toggleCart,
        addProduct: addProduct,
        decreaseProductQuantity: decreaseProductQuantity,
        removeProduct: removeProduct,
        clearCart: clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
