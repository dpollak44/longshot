"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift, Coffee, ArrowRight } from "lucide-react";

export default function GiftSubscriptionPage() {
  const [selectedDuration, setSelectedDuration] = useState("3months");
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    email: "",
    message: "",
  });

  const giftOptions = [
    {
      id: "3months",
      duration: "3 Months",
      price: 54,
      savings: "Save $9",
      description: "Perfect for trying new coffees",
    },
    {
      id: "6months",
      duration: "6 Months",
      price: 102,
      savings: "Save $18",
      description: "A half-year of great coffee",
      popular: true,
    },
    {
      id: "12months",
      duration: "12 Months",
      price: 192,
      savings: "Save $48",
      description: "The ultimate coffee gift",
    },
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <div className="text-center mb-8">
        <Gift size={48} className="mx-auto mb-4 text-yellow-500" />
        <h1 className="text-3xl font-bold mb-4">Gift a Coffee Subscription</h1>
        <p className="text-gray-600">
          Give the gift of exceptional coffee. Choose a duration and we&apos;ll handle the rest.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Choose Gift Duration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {giftOptions.map((option) => (
            <label key={option.id} className="relative">
              <input
                type="radio"
                name="duration"
                value={option.id}
                checked={selectedDuration === option.id}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="sr-only"
              />
              <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                selectedDuration === option.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}>
                {option.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">{option.duration}</h3>
                  <p className="text-2xl font-bold mb-1">${option.price}</p>
                  <p className="text-sm text-green-600 mb-2">{option.savings}</p>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Recipient Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Recipient&apos;s Name</label>
            <input
              type="text"
              value={recipientInfo.name}
              onChange={(e) => setRecipientInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Recipient&apos;s Email</label>
            <input
              type="email"
              value={recipientInfo.email}
              onChange={(e) => setRecipientInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Gift Message (Optional)</label>
            <textarea
              value={recipientInfo.message}
              onChange={(e) => setRecipientInfo(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              rows={4}
              placeholder="Write a personal message to the recipient..."
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Coffee size={20} />
          What&apos;s Included
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>12oz bag of premium coffee delivered every 2 weeks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Curated selection of our best single origins and blends</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Free shipping on all deliveries</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Beautiful gift announcement email sent to recipient</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Tasting notes and brewing tips with each delivery</span>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <div>
          <p className="text-sm text-gray-600">Total for gift subscription</p>
          <p className="text-2xl font-bold">
            ${giftOptions.find(o => o.id === selectedDuration)?.price}.00
          </p>
        </div>
        
        <button className="px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          Continue to Checkout
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Questions about gift subscriptions?{" "}
          <Link href="/about/contact" className="underline">Contact us</Link>
        </p>
      </div>
    </div>
  );
}