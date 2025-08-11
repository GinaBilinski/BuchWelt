/* eslint-disable react-refresh/only-export-components */
// src/components/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  cover: string;
  description: string;
};

type CartContextType = {
  cart: Book[];
  addToCart: (book: Book) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCart((prev) => [...prev, book]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
