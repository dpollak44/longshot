"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { 
    items, 
    checkoutUrl,
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (checkoutUrl) {
      setIsCheckingOut(true);
      window.location.href = checkoutUrl;
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
          <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any coffee to your cart yet.
          </p>
          <Link 
            href="/shop/all" 
            className="bg-black text-white px-8 py-3 inline-block hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.variantId} className="bg-white border rounded-lg p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        ☕
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          href={`/shop/product/${item.handle}`}
                          className="font-semibold hover:underline"
                        >
                          {item.title}
                        </Link>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-sm text-gray-600">{item.variantTitle}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 hover:border-black transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 hover:border-black transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link 
              href="/shop/all"
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-sm text-gray-500">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-sm text-gray-500">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={!checkoutUrl || isCheckingOut}
              className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Redirecting...' : 'Proceed to Checkout'}
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Secure checkout powered by Shopify
              </p>
            </div>
            
            {/* Benefits */}
            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span>✓</span>
                <span>Free shipping on orders over $40</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>✓</span>
                <span>Freshly roasted coffee</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>✓</span>
                <span>100% satisfaction guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}