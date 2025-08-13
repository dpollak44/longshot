import Link from "next/link";
import { Coffee, ShoppingBag } from "lucide-react";

const merchandise = [
  {
    id: "tshirt-black",
    name: "Longshot Logo T-Shirt",
    category: "Apparel",
    price: 25.00,
    description: "Premium cotton t-shirt with Longshot logo",
    color: "Black",
  },
  {
    id: "tshirt-white",
    name: "Longshot Logo T-Shirt",
    category: "Apparel",
    price: 25.00,
    description: "Premium cotton t-shirt with Longshot logo",
    color: "White",
  },
  {
    id: "hoodie",
    name: "Longshot Hoodie",
    category: "Apparel",
    price: 55.00,
    description: "Cozy hoodie for coffee lovers",
    color: "Charcoal",
  },
  {
    id: "mug-ceramic",
    name: "Ceramic Coffee Mug",
    category: "Drinkware",
    price: 18.00,
    description: "12oz ceramic mug with Longshot branding",
    color: "White",
  },
  {
    id: "travel-mug",
    name: "Insulated Travel Mug",
    category: "Drinkware",
    price: 32.00,
    description: "16oz insulated travel mug",
    color: "Black",
  },
  {
    id: "tote-bag",
    name: "Canvas Tote Bag",
    category: "Accessories",
    price: 20.00,
    description: "Reusable canvas tote with Longshot design",
    color: "Natural",
  },
];

const categories = [
  { name: "All Coffee", href: "/shop/all" },
  { name: "Single Origin", href: "/shop/single-origin" },
  { name: "Blends", href: "/shop/blends" },
  { name: "Decaf", href: "/shop/decaf" },
  { name: "Equipment", href: "/shop/equipment" },
  { name: "Merchandise", href: "/shop/merchandise", active: true },
];

export default function MerchandisePage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Merchandise</h1>
        <p className="text-gray-600 max-w-2xl">
          Show your love for Longshot Coffee with our branded merchandise. 
          From apparel to drinkware, we&apos;ve got you covered.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              category.active
                ? "bg-black text-white"
                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">{merchandise.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {merchandise.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center">
              {item.category === "Drinkware" ? (
                <Coffee size={80} className="text-gray-400" />
              ) : (
                <ShoppingBag size={80} className="text-gray-400" />
              )}
            </div>
            
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{item.category}</p>
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{item.description}</p>
              <p className="text-sm text-gray-500 mb-2">Color: {item.color}</p>
              <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}