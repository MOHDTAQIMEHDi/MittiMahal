'use client';
import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Initialize cartItems from localStorage if available
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Sync cartItems with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add an item to the cart
    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    // Function to remove an item from the cart
    const removeItemFromCart = (itemId) => {
        setCartItems((prevItems) =>
            prevItems
                .map((cartItem) =>
                    cartItem._id === itemId
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
                .filter((cartItem) => cartItem.quantity > 0)
        );
    };

    // Function to calculate the total amount
    const calculateTotalAmount = () => {
        return cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addItemToCart, removeItemFromCart, calculateTotalAmount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};

export default useCartContext;