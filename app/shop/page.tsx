import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const allCoffees = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    origin: "Yirgacheffe, Ethiopia",
    price: 24.00,
    notes: ["Floral", "Lemon", "Bergamot"],
    roastLevel: "light" as const,
  },
  {
    id: "colombia-geisha",
    name: "Colombia Geisha",
    origin: "Huila, Colombia",
    price: 32.00,
    notes: ["Jasmine", "Peach", "Honey"],
    roastLevel: "light" as const,
  },
  {
    id: "kenya-aa",
    name: "Kenya AA",
    origin: "Nyeri, Kenya",
    price: 26.00,
    notes: ["Blackcurrant", "Wine", "Tomato"],
    roastLevel: "light" as const,
  },
  {
    id: "guatemala-antigua",
    name: "Guatemala Antigua",
    origin: "Antigua, Guatemala",
    price: 22.00,
    notes: ["Chocolate", "Spice", "Orange"],
    roastLevel: "medium" as const,
  },
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
  {
    id: "decaf-colombia",
    name: "Decaf Colombia",
    origin: "Colombia",
    price: 20.00,
    notes: ["Caramel", "Citrus", "Smooth"],
    roastLevel: "medium" as const,
  },
];

const categories = [
  { name: "All Coffee", href: "/shop/all", active: true },
  { name: "Single Origin", href: "/shop/single-origin" },
  { name: "Blends", href: "/shop/blends" },
  { name: "Decaf", href: "/shop/decaf" },
  { name: "Equipment", href: "/shop/equipment" },
  { name: "Merchandise", href: "/shop/merchandise" },
];

export default function ShopPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Shop All Coffee</h1>
        <p className="text-gray-600 max-w-2xl">
          Explore our complete collection of specialty coffees. From bright and fruity single origins 
          to rich and balanced blends, we have something for every palate.
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
        <p className="text-sm text-gray-600">{allCoffees.length} products</p>
        <select className="px-4 py-2 border border-gray-300 text-sm">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Name: A to Z</option>
          <option>Name: Z to A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCoffees.map((coffee) => (
          <ProductCard key={coffee.id} {...coffee} />
        ))}
      </div>
    </div>
  );
}