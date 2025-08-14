import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

export default async function AllCoffeePage() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 50 }),
    getCollections()
  ]);

  const categories = [
    { name: "All Coffee", href: "/shop/all", active: true },
    ...collections.map((col: any) => ({
      name: col.title,
      href: `/shop/collection/${col.handle}`,
      active: false
    }))
  ];
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Coffee</h1>
        <p className="text-gray-600 max-w-2xl">
          Browse our complete collection of specialty coffees from around the world.
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
        <p className="text-sm text-gray-600">{products.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => {
          const coffee = {
            id: product.handle,
            name: product.title,
            origin: product.tags.find((tag: string) => tag.includes(',')) || 'Various Origins',
            price: parseFloat(product.priceRange.minVariantPrice.amount),
            notes: product.tags.filter((tag: string) => !tag.includes('-') && !tag.includes(',')).slice(0, 3),
            roastLevel: product.tags.includes('light-roast') ? 'light' as const : 
                        product.tags.includes('dark-roast') ? 'dark' as const : 'medium' as const,
            imageUrl: product.images?.edges?.[0]?.node?.url || product.featuredImage?.url || undefined
          };
          return <ProductCard key={coffee.id} {...coffee} />;
        })}
      </div>
    </div>
  );
}