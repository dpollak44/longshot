"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";

const coffeeProducts: Record<string, any> = {
  "ethiopia-yirgacheffe": {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    origin: "Yirgacheffe, Ethiopia",
    price: 24.00,
    notes: ["Floral", "Lemon", "Bergamot"],
    roastLevel: "light",
    description: "This exceptional coffee from the birthplace of arabica showcases bright, wine-like acidity with delicate floral notes. Grown at 1,700-2,200 meters above sea level, these beans are washed processed to highlight their natural complexity.",
    altitude: "1,700-2,200 masl",
    process: "Washed",
    variety: "Heirloom",
    harvest: "October - December",
  },
  "colombia-geisha": {
    id: "colombia-geisha",
    name: "Colombia Geisha",
    origin: "Huila, Colombia",
    price: 32.00,
    notes: ["Jasmine", "Peach", "Honey"],
    roastLevel: "light",
    description: "A rare and exotic variety from the mountains of Huila. This Geisha displays extraordinary clarity and complexity with jasmine florals and stone fruit sweetness.",
    altitude: "1,800-2,000 masl",
    process: "Washed",
    variety: "Geisha",
    harvest: "May - July",
  },
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState("whole");
  const [size, setSize] = useState("12oz");
  
  const product = coffeeProducts[params.id] || coffeeProducts["ethiopia-yirgacheffe"];

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  const calculatePrice = () => {
    const sizeMultiplier = size === "5lb" ? 4 : 1;
    return (product.price * quantity * sizeMultiplier).toFixed(2);
  };

  return (
    <div className="container py-8">
      <Link href="/shop/all" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6">
        <ArrowLeft size={20} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">☕</div>
              <p className="text-gray-500">Product Image</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.origin}</p>
          
          <div className="flex gap-2 mb-4">
            {product.notes.map((note: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-sm rounded">
                {note}
              </span>
            ))}
          </div>

          <p className="text-2xl font-semibold mb-6">${calculatePrice()}</p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSize("12oz")}
                  className={`px-4 py-2 border ${size === "12oz" ? "border-black bg-black text-white" : "border-gray-300"}`}
                >
                  12oz
                </button>
                <button
                  onClick={() => setSize("5lb")}
                  className={`px-4 py-2 border ${size === "5lb" ? "border-black bg-black text-white" : "border-gray-300"}`}
                >
                  5lb (Save 15%)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Grind</label>
              <select 
                value={grind} 
                onChange={(e) => setGrind(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300"
              >
                <option value="whole">Whole Bean</option>
                <option value="drip">Drip</option>
                <option value="espresso">Espresso</option>
                <option value="french-press">French Press</option>
                <option value="pour-over">Pour Over</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={decrementQuantity} className="p-2 border border-gray-300 hover:bg-gray-100">
                  <Minus size={20} />
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button onClick={incrementQuantity} className="p-2 border border-gray-300 hover:bg-gray-100">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-4">Coffee Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Roast Level:</dt>
                <dd className="font-medium capitalize">{product.roastLevel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Altitude:</dt>
                <dd className="font-medium">{product.altitude}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Process:</dt>
                <dd className="font-medium">{product.process}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Variety:</dt>
                <dd className="font-medium">{product.variety}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Harvest:</dt>
                <dd className="font-medium">{product.harvest}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}