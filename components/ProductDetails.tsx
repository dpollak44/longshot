"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/components/CartProvider";

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string } };
    featuredImage?: { url: string };
    images?: { edges: Array<{ node: { url: string } }> };
    variants?: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string };
        };
      }>;
    };
  };
  roastLevel?: string;
  notes: string[];
  origin: string;
  subscriptionOptions?: Array<{
    id: string;
    name: string;
    variantId: string;
    price: string;
    discount: number;
    frequency: string;
  }>;
  showSubscribe?: boolean;
}

export default function ProductDetails({ 
  product, 
  roastLevel, 
  notes, 
  origin, 
  subscriptionOptions = [], 
  showSubscribe = false 
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState(showSubscribe ? "subscription" : "onetime");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Get the one-time variant
  const onetimeVariant = product.variants?.edges?.find((v) => v.node.title === 'One-time')?.node || product.variants?.edges?.[0]?.node;

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  // Calculate price based on subscription
  const calculatePrice = () => {
    if (purchaseType === "subscription" && subscriptionFrequency) {
      const subscription = subscriptionOptions.find((s) => s.id === subscriptionFrequency);
      if (subscription) {
        const discountedPrice = parseFloat(subscription.price) * quantity;
        return discountedPrice.toFixed(2);
      }
    }
    
    const basePrice = parseFloat(onetimeVariant?.price?.amount || product.priceRange.minVariantPrice.amount);
    return (basePrice * quantity).toFixed(2);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    setAddedToCart(false);
    
    try {
      // Select the appropriate variant based on purchase type
      let variantToAdd = onetimeVariant;
      let variantTitle = 'One-time';
      
      if (purchaseType === "subscription" && subscriptionFrequency) {
        const subscription = subscriptionOptions.find((s) => s.id === subscriptionFrequency);
        if (subscription) {
          // Find the variant matching the subscription
          variantToAdd = product.variants?.edges?.find((v) => v.node.id === subscription.variantId)?.node || onetimeVariant;
          variantTitle = subscription.frequency;
        }
      }
      
      // Add to cart context
      if (variantToAdd) {
        await addToCart({
          variantId: variantToAdd.id,
          productId: product.id,
          title: product.title,
          variantTitle: variantTitle,
          price: parseFloat(variantToAdd.price.amount),
          image: product.featuredImage?.url || product.images?.edges?.[0]?.node?.url,
          handle: product.handle,
          quantity
        });
      }
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-600 mb-4">{origin}</p>
      
      {/* Tasting Notes */}
      <div className="flex gap-2 mb-4">
        {notes.map((note, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-sm rounded">
            {note}
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="text-3xl font-bold mb-6">
        ${calculatePrice()}
        {purchaseType === "subscription" && subscriptionFrequency && (
          <span className="text-lg font-normal text-green-600 ml-2">
            (Save {subscriptionOptions.find((s) => s.id === subscriptionFrequency)?.discount}%)
          </span>
        )}
      </p>

      <p className="text-gray-700 mb-6">
        {product.description}
      </p>

      {/* Purchase Options */}
      {subscriptionOptions.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Purchase Option</label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="purchase"
                value="onetime"
                checked={purchaseType === "onetime"}
                onChange={(e) => setPurchaseType(e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <p className="font-medium">One-time purchase</p>
                <p className="text-sm text-gray-600">
                  ${parseFloat(onetimeVariant?.price?.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </div>
            </label>
            
            <label className="flex items-center p-3 border-2 border-accent bg-accent/10 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="purchase"
                value="subscription"
                checked={purchaseType === "subscription"}
                onChange={(e) => setPurchaseType(e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <p className="font-medium">Subscribe & Save</p>
                <p className="text-sm text-gray-600">
                  Save up to 20% + Free shipping
                </p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Subscription Frequency */}
      {purchaseType === "subscription" && subscriptionOptions.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Delivery Frequency</label>
          <div className="grid grid-cols-1 gap-2">
            {subscriptionOptions.map((option) => (
              <label 
                key={option.id} 
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="frequency"
                  value={option.id}
                  checked={subscriptionFrequency === option.id}
                  onChange={(e) => setSubscriptionFrequency(e.target.value)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <p className="font-medium">{option.name}</p>
                  <p className="text-sm text-gray-600">
                    ${parseFloat(option.price).toFixed(2)} per delivery
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}


      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <button
            onClick={decrementQuantity}
            className="w-10 h-10 border border-gray-300 hover:border-black transition-colors flex items-center justify-center"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-10 h-10 border border-gray-300 hover:border-black transition-colors flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || (purchaseType === "subscription" && !subscriptionFrequency)}
        className={`w-full py-3 font-medium flex items-center justify-center gap-2 transition-all ${
          addedToCart
            ? 'bg-green-600 text-white'
            : 'bg-black text-white hover:bg-gray-800'
        } disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        {addedToCart ? (
          <>
            <Check size={20} />
            Added to Cart!
          </>
        ) : isAdding ? (
          'Adding...'
        ) : (
          <>
            <ShoppingCart size={20} />
            {purchaseType === "subscription" ? 'Subscribe Now' : 'Add to Cart'}
          </>
        )}
      </button>

      {purchaseType === "subscription" && !subscriptionFrequency && (
        <p className="text-sm text-red-600 mt-2">Please select a delivery frequency</p>
      )}

      {/* Shipping Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          ✓ Free shipping on orders over $40<br />
          ✓ Roasted fresh and shipped within 24 hours<br />
          {purchaseType === "subscription" && (
            <>✓ Cancel or pause your subscription anytime</>
          )}
        </p>
      </div>
    </div>
  );
}