import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductByHandle } from "@/lib/shopify";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ subscribe?: string }>
}) {
  // Await params
  const { id } = await params;
  const { subscribe } = await searchParams;
  
  // Fetch product from Shopify
  const product = await getProductByHandle(id);
  
  if (!product) {
    return (
      <div className="container py-8">
        <Link href="/shop/all" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn&apos;t find that product.</p>
          <Link href="/shop/all" className="bg-black text-white px-6 py-3 inline-block hover:bg-gray-800">
            Browse All Coffee
          </Link>
        </div>
      </div>
    );
  }

  // Create subscription options based on variant titles
  const subscriptionOptions = product.variants?.edges
    ?.filter((v: { node: { title: string } }) => v.node.title !== 'One-time')
    ?.map((v: { node: { id: string; title: string; price: { amount: string } } }) => {
      const discount = v.node.title === 'Weekly' ? 20 : 15;
      return {
        id: v.node.id,
        name: `Deliver every ${v.node.title.toLowerCase().replace('-', ' ')} • Save ${discount}%`,
        variantId: v.node.id,
        price: v.node.price.amount,
        discount,
        frequency: v.node.title
      };
    }) || [];
    
  const hasSubscriptions = subscriptionOptions.length > 0;

  // Parse product details
  const roastLevel = product.tags.includes('light-roast') ? 'light' : 
                    product.tags.includes('dark-roast') ? 'dark' : 'medium';
  
  const notes = product.tags
    .filter((tag: string) => !tag.includes('-') && !tag.includes(',') && tag.length < 20)
    .slice(0, 3);

  const origin = product.tags.find((tag: string) => tag.includes(',')) || 
                product.vendor || 'Various Origins';

  return (
    <div className="container py-8">
      <Link href="/shop/all" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6">
        <ArrowLeft size={20} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {product.featuredImage ? (
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.featuredImage.url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : product.images?.edges?.length > 0 ? (
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images.edges[0].node.url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">☕</div>
                <p className="text-gray-500">Product Image</p>
              </div>
            </div>
          )}
          
          {/* Additional images thumbnails */}
          {product.images?.edges?.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.edges.slice(0, 4).map((img: { node: { url: string; altText: string | null } }, index: number) => (
                <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img
                    src={img.node.url}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info - Client Component */}
        <ProductDetails 
          product={product}
          roastLevel={roastLevel}
          notes={notes}
          origin={origin}
          subscriptionOptions={subscriptionOptions}
          showSubscribe={subscribe === 'true'}
        />
      </div>

      {/* Product Details Section */}
      <div className="mt-16 border-t pt-12">
        <h2 className="font-serif text-2xl font-bold mb-6">Coffee Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Roast Level:</p>
            <p className="font-medium capitalize">{roastLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Origin:</p>
            <p className="font-medium">{origin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Process:</p>
            <p className="font-medium">Washed</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Harvest:</p>
            <p className="font-medium">Seasonal</p>
          </div>
        </div>
      </div>

      {/* Subscription Benefits */}
      {hasSubscriptions && (
        <div className="mt-12 bg-gradient-to-br from-accent/20 to-yellow-50 p-8 rounded-lg">
          <h3 className="font-serif text-2xl font-bold mb-4">Subscribe & Save</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-semibold">Save up to 20%</p>
                <p className="text-sm text-gray-600">On every order</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-gray-600">Always included</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏸️</span>
              <div>
                <p className="font-semibold">Flexible</p>
                <p className="text-sm text-gray-600">Pause or cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}