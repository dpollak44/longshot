"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Coffee, Calendar, Truck, ArrowRight } from "lucide-react";

const subscriptionPlans = [
  {
    id: "weekly",
    name: "Weekly",
    price: "From $16/week",
    description: "Perfect for coffee enthusiasts",
    features: ["Fresh coffee every week", "15% discount", "Free shipping", "Pause or cancel anytime"],
  },
  {
    id: "biweekly",
    name: "Every Two Weeks",
    price: "From $16/delivery",
    description: "Our most popular option",
    features: ["Fresh coffee every 2 weeks", "15% discount", "Free shipping", "Pause or cancel anytime"],
    popular: true,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "From $16/month",
    description: "Great for occasional drinkers",
    features: ["Fresh coffee monthly", "15% discount", "Free shipping", "Pause or cancel anytime"],
  },
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("biweekly");

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Coffee Subscriptions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Never run out of great coffee. Get your favorite beans delivered on your schedule 
          with 15% off every order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative border-2 p-6 rounded-lg cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? "border-black shadow-lg"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-semibold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            )}
            
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-semibold mb-2">{plan.price}</p>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
            
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            {selectedPlan === plan.id && (
              <div className="absolute -inset-[2px] border-2 border-black rounded-lg pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Coffee size={24} className="text-black" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">1. Choose Your Coffee</h3>
              <p className="text-sm text-gray-600">
                Select from our range of single origins, blends, or let us surprise you
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar size={24} className="text-black" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Set Your Schedule</h3>
              <p className="text-sm text-gray-600">
                Weekly, biweekly, or monthly deliveries. Change or pause anytime
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Truck size={24} className="text-black" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Enjoy Fresh Coffee</h3>
              <p className="text-sm text-gray-600">
                Roasted to order and delivered fresh to your door with free shipping
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
          Start Your Subscription
          <ArrowRight size={20} />
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Questions? <Link href="/about/contact" className="underline">Contact us</Link> or check our{" "}
          <Link href="/faq" className="underline">FAQ</Link>
        </p>
      </div>

      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Gift Subscriptions</h2>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg text-center">
          <p className="text-lg mb-6">
            Give the gift of great coffee. Gift subscriptions available for 3, 6, or 12 months.
          </p>
          <Link
            href="/subscribe/gift"
            className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            Shop Gift Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
}