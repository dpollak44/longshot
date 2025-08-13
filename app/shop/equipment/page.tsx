import Link from "next/link";
import { Coffee, Package, Droplets, Thermometer } from "lucide-react";

const equipment = [
  {
    id: "chemex-6cup",
    name: "Chemex 6-Cup",
    category: "Pour Over",
    price: 45.00,
    description: "Classic pour-over brewer with elegant design",
    icon: Coffee,
  },
  {
    id: "v60-dripper",
    name: "Hario V60 Dripper",
    category: "Pour Over",
    price: 28.00,
    description: "Precision pour-over dripper for ultimate control",
    icon: Coffee,
  },
  {
    id: "aeropress",
    name: "AeroPress",
    category: "Immersion",
    price: 40.00,
    description: "Versatile and portable coffee maker",
    icon: Package,
  },
  {
    id: "french-press",
    name: "French Press (34oz)",
    category: "Immersion",
    price: 35.00,
    description: "Classic full-bodied brewing method",
    icon: Package,
  },
  {
    id: "gooseneck-kettle",
    name: "Gooseneck Kettle",
    category: "Accessories",
    price: 65.00,
    description: "Precision pouring for optimal extraction",
    icon: Droplets,
  },
  {
    id: "scale-timer",
    name: "Coffee Scale with Timer",
    category: "Accessories",
    price: 55.00,
    description: "Accurate measurements for consistent brewing",
    icon: Thermometer,
  },
];

const categories = [
  { name: "All Coffee", href: "/shop/all" },
  { name: "Single Origin", href: "/shop/single-origin" },
  { name: "Blends", href: "/shop/blends" },
  { name: "Decaf", href: "/shop/decaf" },
  { name: "Equipment", href: "/shop/equipment", active: true },
  { name: "Merchandise", href: "/shop/merchandise" },
];

export default function EquipmentPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Brewing Equipment</h1>
        <p className="text-gray-600 max-w-2xl">
          Everything you need to brew exceptional coffee at home. From pour-over to immersion brewing,
          we have the tools to help you make the perfect cup.
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
        <p className="text-sm text-gray-600">{equipment.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {equipment.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center">
                <Icon size={80} className="text-gray-400" />
              </div>
              
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}