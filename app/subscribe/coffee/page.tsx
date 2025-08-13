"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

export default function CoffeeSubscriptionPage() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    frequency: "biweekly",
    quantity: "1bag",
    roast: "variety",
    grind: "whole",
  });

  const updateSelection = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create Your Coffee Subscription</h1>
      
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
              step >= num ? "bg-black text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {step > num ? <Check size={20} /> : num}
            </div>
            {num < 4 && (
              <div className={`w-full h-1 ${step > num ? "bg-black" : "bg-gray-200"}`} 
                   style={{ width: "100px", marginLeft: "8px", marginRight: "8px" }} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">How often would you like coffee delivered?</h2>
          <div className="space-y-4">
            {[
              { value: "weekly", label: "Every Week", price: "Perfect for heavy drinkers" },
              { value: "biweekly", label: "Every 2 Weeks", price: "Most popular choice" },
              { value: "monthly", label: "Every Month", price: "Great for light drinkers" },
            ].map((option) => (
              <label key={option.value} className="block">
                <input
                  type="radio"
                  name="frequency"
                  value={option.value}
                  checked={selections.frequency === option.value}
                  onChange={(e) => updateSelection("frequency", e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selections.frequency === option.value
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{option.label}</p>
                      <p className="text-sm text-gray-600">{option.price}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      selections.frequency === option.value
                        ? "border-black bg-black"
                        : "border-gray-300"
                    }`}>
                      {selections.frequency === option.value && (
                        <Check size={16} className="text-white m-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">How much coffee do you need?</h2>
          <div className="space-y-4">
            {[
              { value: "1bag", label: "1 Bag (12oz)", price: "$17/delivery", desc: "1-2 cups per day" },
              { value: "2bags", label: "2 Bags (24oz)", price: "$32/delivery", desc: "2-4 cups per day" },
              { value: "3bags", label: "3 Bags (36oz)", price: "$45/delivery", desc: "4+ cups per day" },
            ].map((option) => (
              <label key={option.value} className="block">
                <input
                  type="radio"
                  name="quantity"
                  value={option.value}
                  checked={selections.quantity === option.value}
                  onChange={(e) => updateSelection("quantity", e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selections.quantity === option.value
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{option.label}</p>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{option.price}</p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Choose your roast preference</h2>
          <div className="space-y-4">
            {[
              { value: "light", label: "Light Roast", desc: "Bright, fruity, and floral notes" },
              { value: "medium", label: "Medium Roast", desc: "Balanced, smooth, chocolate notes" },
              { value: "dark", label: "Dark Roast", desc: "Bold, rich, smoky flavors" },
              { value: "variety", label: "Roaster's Choice", desc: "Let us surprise you with variety" },
            ].map((option) => (
              <label key={option.value} className="block">
                <input
                  type="radio"
                  name="roast"
                  value={option.value}
                  checked={selections.roast === option.value}
                  onChange={(e) => updateSelection("roast", e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selections.roast === option.value
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}>
                  <div>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">How should we grind your coffee?</h2>
          <div className="space-y-4">
            {[
              { value: "whole", label: "Whole Bean", desc: "Grind fresh at home" },
              { value: "drip", label: "Drip", desc: "For automatic drip machines" },
              { value: "espresso", label: "Espresso", desc: "Fine grind for espresso machines" },
              { value: "french", label: "French Press", desc: "Coarse grind for immersion brewing" },
              { value: "pour", label: "Pour Over", desc: "Medium-fine for V60, Chemex" },
            ].map((option) => (
              <label key={option.value} className="block">
                <input
                  type="radio"
                  name="grind"
                  value={option.value}
                  checked={selections.grind === option.value}
                  onChange={(e) => updateSelection("grind", e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selections.grind === option.value
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}>
                  <div>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className={`px-6 py-2 border border-gray-300 font-medium ${
            step === 1 ? "invisible" : ""
          }`}
        >
          Back
        </button>
        
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
        ) : (
          <button className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Continue to Checkout
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Your Subscription Summary</h3>
        <ul className="text-sm space-y-1">
          <li>Frequency: <span className="font-medium capitalize">{selections.frequency}</span></li>
          <li>Quantity: <span className="font-medium">{selections.quantity.replace("bag", " bag").replace("s", " bags")}</span></li>
          <li>Roast: <span className="font-medium capitalize">{selections.roast === "variety" ? "Roaster's Choice" : selections.roast}</span></li>
          <li>Grind: <span className="font-medium capitalize">{selections.grind === "whole" ? "Whole Bean" : selections.grind}</span></li>
        </ul>
      </div>
    </div>
  );
}