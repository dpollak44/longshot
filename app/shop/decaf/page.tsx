import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const decafCoffees = [
  {
    id: "decaf-colombia",
    name: "Decaf Colombia",
    origin: "Colombia",
    price: 20.00,
    notes: ["Caramel", "Citrus", "Smooth"],
    roastLevel: "medium" as const,
  },
  {
    id: "decaf-ethiopia",
    name: "Decaf Ethiopia Natural",
    origin: "Sidamo, Ethiopia",
    price: 22.00,
    notes: ["Berry", "Wine", "Chocolate"],
    roastLevel: "light" as const,
  },
  {
    id: "decaf-mexico",
    name: "Decaf Mexico Chiapas",
    origin: "Chiapas, Mexico",
    price: 19.00,
    notes: ["Nutty", "Mild", "Sweet"],
    roastLevel: "medium" as const,
  },
];

const categories = [
  { name: "All Coffee", href: "/shop/all" },
  { name: "Single Origin", href: "/shop/single-origin" },
  { name: "Blends", href: "/shop/blends" },
  { name: "Decaf", href: "/shop/decaf", active: true },
  { name: "Equipment", href: "/shop/equipment" },
  { name: "Merchandise", href: "/shop/merchandise" },
];

export default function DecafPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Decaf Coffee</h1>
        <p className="text-gray-600 max-w-2xl">
          Enjoy the full flavor of specialty coffee without the caffeine. 
          Our decaf coffees use the Swiss Water Process for chemical-free decaffeination.
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
        <p className="text-sm text-gray-600">{decafCoffees.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {decafCoffees.map((coffee) => (
          <ProductCard key={coffee.id} {...coffee} />
        ))}
      </div>
    </div>
  );
}