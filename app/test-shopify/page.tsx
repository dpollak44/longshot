import { getAllProducts, getAllCollections } from "@/lib/shopify";

export default async function TestShopifyPage() {
  try {
    // Test fetching products from Shopify
    const products = await getAllProducts(10);
    const collections = await getAllCollections();

    return (
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopify Test Page</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Store Info</h2>
          <p className="text-sm text-gray-600">Store Domain: {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}</p>
          <p className="text-sm text-gray-600">API Token: {process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.substring(0, 10)}...</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Collections ({collections.length})</h2>
          {collections.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collections.map((collection: any) => (
                <div key={collection.id} className="border p-4 rounded">
                  <h3 className="font-bold">{collection.title}</h3>
                  <p className="text-sm text-gray-600">{collection.handle}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No collections found. Create them in Shopify admin.</p>
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Products ({products.length})</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <div key={product.id} className="border p-4 rounded">
                  {product.featuredImage && (
                    <div className="mb-3 h-48 bg-gray-100 overflow-hidden rounded">
                      <img 
                        src={product.featuredImage.url} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-bold">{product.title}</h3>
                  <p className="text-gray-600">{product.description?.substring(0, 100)}...</p>
                  <p className="font-semibold mt-2">
                    ${product.priceRange?.minVariantPrice?.amount}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags?.map((tag: string, i: number) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found. We need to add them to your Shopify store.</p>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded">
          <h3 className="font-bold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Verify your Shopify store URL in the admin</li>
            <li>Make sure the Admin API access token has correct permissions</li>
            <li>Run the setup script to populate products</li>
            <li>Check this page again to see the products</li>
          </ol>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Shopify Connection Error</h1>
        <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
        <div className="mt-4">
          <p className="font-bold">Troubleshooting:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Check that your store domain is correct: {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}</li>
            <li>Verify the Storefront API token is valid</li>
            <li>Ensure the Storefront API has the correct permissions</li>
            <li>Check the browser console for more details</li>
          </ul>
        </div>
      </div>
    );
  }
}