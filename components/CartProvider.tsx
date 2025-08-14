"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCheckout, addToCart as addToShopifyCart } from '@/lib/shopify';

interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image?: string;
  handle: string;
}

interface CartContextType {
  items: CartItem[];
  checkoutUrl: string | null;
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => Promise<void>;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart_items');
    const savedCheckoutId = localStorage.getItem('shopify_checkout_id');
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }
    
    if (savedCheckoutId) {
      setCheckoutId(savedCheckoutId);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addToCart = async (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setIsLoading(true);
    
    try {
      const quantity = newItem.quantity || 1;
      
      // Update local state
      setItems(prev => {
        const existingItem = prev.find(item => item.variantId === newItem.variantId);
        
        if (existingItem) {
          return prev.map(item =>
            item.variantId === newItem.variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prev, { ...newItem, quantity }];
        }
      });

      // Update Shopify checkout
      if (!checkoutId) {
        const checkout = await createCheckout([{
          variantId: newItem.variantId,
          quantity
        }]);
        
        if (checkout?.checkout?.id) {
          setCheckoutId(checkout.checkout.id);
          setCheckoutUrl(checkout.checkout.webUrl);
          localStorage.setItem('shopify_checkout_id', checkout.checkout.id);
        }
      } else {
        await addToShopifyCart(checkoutId, [{
          variantId: newItem.variantId,
          quantity
        }]);
      }
      
      // Dispatch event for other components
      const event = new CustomEvent('cart-updated', { detail: { items: items } });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (variantId: string) => {
    setItems(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
    } else {
      setItems(prev =>
        prev.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    setCheckoutId(null);
    setCheckoutUrl(null);
    localStorage.removeItem('cart_items');
    localStorage.removeItem('shopify_checkout_id');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        checkoutUrl,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}