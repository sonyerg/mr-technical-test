import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (newItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.size === newItem.size
      );
      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += newItem.quantity;

        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, isCartOpen, setIsCartOpen, handleAddToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
