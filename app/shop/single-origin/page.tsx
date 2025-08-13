import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const singleOriginCoffees = [
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
    id: "costa-rica-tarrazu",
    name: "Costa Rica Tarrazú",
    origin: "Tarrazú, Costa Rica",
    price: 23.00,
    notes: ["Citrus", "Chocolate", "Honey"],
    roastLevel: "medium" as const,
  },
  {
    id: "peru-organic",
    name: "Peru Organic",
    origin: "Cajamarca, Peru",
    price: 21.00,
    notes: ["Caramel", "Nuts", "Mild"],
    roastLevel: "medium" as const,
  },
];

const categories = [
  { name: "All Coffee", href: "/shop/all" },
  { name: "Single Origin", href: "/shop/single-origin", active: true },
  { name: "Blends", href: "/shop/blends" },
  { name: "Decaf", href: "/shop/decaf" },
  { name: "Equipment", href: "/shop/equipment" },
  { name: "Merchandise", href: "/shop/merchandise" },
];

export default function SingleOriginPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Single Origin Coffee</h1>
        <p className="text-gray-600 max-w-2xl">
          Experience the unique characteristics of coffee from a single farm, region, or country. 
          Each origin tells its own story through distinctive flavor profiles.
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
        <p className="text-sm text-gray-600">{singleOriginCoffees.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {singleOriginCoffees.map((coffee) => (
          <ProductCard key={coffee.id} {...coffee} />
        ))}
      </div>
    </div>
  );
}