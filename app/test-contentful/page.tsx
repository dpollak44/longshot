import { getFeaturedProducts, getHeroSlides } from "@/lib/contentful";

export default async function TestContentfulPage() {
  try {
    // Fetch data from Contentful
    const [products, slides] = await Promise.all([
      getFeaturedProducts(),
      getHeroSlides()
    ]);

    return (
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contentful Test Page</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">✅ Connection Status: Success!</h2>
          <p className="text-green-600">Successfully connected to your Contentful space.</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Hero Slides ({slides.length})</h2>
          <div className="space-y-4">
            {slides.map((slide: any) => (
              <div key={slide.sys.id} className="border p-4 rounded">
                <h3 className="font-bold">{slide.fields.title}</h3>
                <p className="text-gray-600">{slide.fields.subtitle}</p>
                <p className="text-sm">
                  CTA: {slide.fields.ctaText} → {slide.fields.ctaLink}
                </p>
                <p className="text-xs text-gray-500">Order: {slide.fields.order}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Products ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div key={product.sys.id} className="border p-4 rounded">
                <h3 className="font-bold">{product.fields.name}</h3>
                <p className="text-gray-600">{product.fields.origin}</p>
                <p className="font-semibold">${product.fields.price}</p>
                <p className="text-sm capitalize">Roast: {product.fields.roastLevel}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.fields.notes?.map((note: any, i: number) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Next Steps:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <a href="https://app.contentful.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">app.contentful.com</a></li>
            <li>Edit your products and hero slides</li>
            <li>Add images to products (Media → Upload)</li>
            <li>Rename your homepage: <code className="bg-gray-200 px-2 py-1">mv app/page-contentful.tsx app/page.tsx</code></li>
            <li>Your site will now use Contentful content!</li>
          </ol>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Contentful Connection Error</h1>
        <pre className="bg-red-50 p-4 rounded text-sm">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
        <div className="mt-4">
          <p>Please check:</p>
          <ul className="list-disc list-inside">
            <li>Your .env.local file has the correct credentials</li>
            <li>You&apos;ve restarted the dev server after adding credentials</li>
            <li>Your Contentful space has published content</li>
          </ul>
        </div>
      </div>
    );
  }
}