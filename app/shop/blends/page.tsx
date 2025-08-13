import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const blendCoffees = [
  {
    id: "house-blend",
    name: "Longshot House Blend",
    origin: "Central & South America",
    price: 18.00,
    notes: ["Chocolate", "Caramel", "Nuts"],
    roastLevel: "medium" as const,
  },
  {
    id: "breakfast-blend",
    name: "Morning Glory Blend",
    origin: "Various",
    price: 16.00,
    notes: ["Balanced", "Smooth", "Nutty"],
    roastLevel: "medium" as const,
  },
  {
    id: "espresso-blend",
    name: "Espresso Perfetto",
    origin: "Brazil & Colombia",
    price: 19.00,
    notes: ["Rich", "Syrupy", "Cocoa"],
    roastLevel: "medium" as const,
  },
  {
    id: "espresso-dark",
    name: "Midnight Espresso",
    origin: "Brazil & Indonesia",
    price: 20.00,
    notes: ["Dark Chocolate", "Molasses", "Smoke"],
    roastLevel: "dark" as const,
  },
  {
    id: "french-roast",
    name: "French Roast",
    origin: "Central America",
    price: 18.00,
    notes: ["Bold", "Smoky", "Bittersweet"],
    roastLevel: "dark" as const,
  },
];

const categories = [
  { name: "All Coffee", href: "/shop/all" },
  { name: "Single Origin", href: "/shop/single-origin" },
  { name: "Blends", href: "/shop/blends", active: true },
  { name: "Decaf", href: "/shop/decaf" },
  { name: "Equipment", href: "/shop/equipment" },
  { name: "Merchandise", href: "/shop/merchandise" },
];

export default function BlendsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Coffee Blends</h1>
        <p className="text-gray-600 max-w-2xl">
          Our expertly crafted blends combine beans from multiple origins to create 
          balanced, consistent, and delicious flavor profiles.
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
        <p className="text-sm text-gray-600">{blendCoffees.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blendCoffees.map((coffee) => (
          <ProductCard key={coffee.id} {...coffee} />
        ))}
      </div>
    </div>
  );
}