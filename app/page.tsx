import HeroSlideshow from "@/components/HeroSlideshow";
import GallerySection from "@/components/GallerySection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  // Fetch featured products from Shopify
  const products = await getProducts({ first: 4 });
  
  const featuredCoffees = products.map((product: any) => ({
    id: product.handle,
    name: product.title,
    origin: product.tags.find((tag: string) => tag.includes(',')) || 'Various Origins',
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    notes: product.tags.filter((tag: string) => !tag.includes('-') && !tag.includes(',')).slice(0, 3),
    roastLevel: product.tags.includes('light-roast') ? 'light' as const : 
                product.tags.includes('dark-roast') ? 'dark' as const : 'medium' as const,
    image: product.images?.edges?.[0]?.node?.url || product.featuredImage?.url || null
  }));
  return (
    <div>
      <HeroSlideshow />
      
      <section className="py-20 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left side - Text and Image */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <p className="font-cursive text-2xl text-gray-600 mb-2">Discover</p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  This Season&apos;s Collection
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Exceptional coffees from our partner farms. Each selection represents months of careful cultivation, 
                  precise processing, and expert roasting.
                </p>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 text-black font-medium border-b-2 border-black pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
                >
                  View All Coffee
                  <ArrowRight size={20} />
                </Link>
              </div>
              
              {/* Featured image below text */}
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=750&fit=crop"
                  alt="Coffee roasting process"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="bg-white/90 backdrop-blur px-4 py-3 text-sm font-medium">
                    Roasted fresh daily in small batches
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side - Product Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {featuredCoffees.map((coffee: any, index: number) => (
                  <Link 
                    key={coffee.id} 
                    href={`/shop/product/${coffee.id}`}
                    className="group relative overflow-hidden"
                  >
                    <div className={`aspect-square bg-gray-100 relative ${index === 0 || index === 3 ? 'row-span-1' : ''}`}>
                      <img
                        src={coffee.image || `https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&h=600&fit=crop`}
                        alt={coffee.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-1">{coffee.name}</h3>
                        <p className="text-sm opacity-90">{coffee.origin}</p>
                        <p className="text-lg font-semibold mt-2">${coffee.price.toFixed(2)}</p>
                      </div>
                      {/* Roast level tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 text-black text-xs font-medium capitalize">
                          {coffee.roastLevel} roast
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 md:py-24">
        <GallerySection />
      </div>

      <section className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-cursive text-2xl text-gray-600 mb-2">Experience</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Why Longshot?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe exceptional coffee requires obsessive attention to every detail—from farm to cup.
              </p>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-l-2 border-black pl-6">
                  <h3 className="font-semibold text-xl mb-3">Direct Trade</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We work directly with farmers, ensuring fair prices and exceptional quality while building lasting relationships.
                  </p>
                </div>
                
                <div className="border-l-2 border-black pl-6">
                  <h3 className="font-semibold text-xl mb-3">Small Batch</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every batch is carefully roasted to bring out the unique characteristics of each origin.
                  </p>
                </div>
                
                <div className="border-l-2 border-black pl-6">
                  <h3 className="font-semibold text-xl mb-3">Roasted Fresh</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Orders are roasted daily and shipped within 24 hours, ensuring peak freshness.
                  </p>
                </div>
                
                <div className="border-l-2 border-black pl-6">
                  <h3 className="font-semibold text-xl mb-3">Free Shipping</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Complimentary shipping on orders over $40. Subscribe for an additional 15% savings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8 py-20 md:py-24">
        <div className="bg-black text-white p-12 md:p-20 rounded-lg shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-cursive text-3xl text-yellow-500 mb-2">Subscribe & Save</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Never Run Out of Great Coffee
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Subscribe to your favorite coffees and save 15% on every order. 
              Pause, skip, or cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subscribe"
                className="bg-accent text-black px-8 py-3 font-medium hover:bg-yellow-500 transition-colors"
              >
                Start Your Subscription
              </Link>
              <Link
                href="/subscribe/gift"
                className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                Give a Gift Subscription
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-cursive text-2xl text-gray-600 mb-2">Our Story</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Exceptional Coffee, Curious People</h2>
              <p className="text-gray-600 mb-6">
                At Longshot Coffee Company, we believe that great coffee brings people together. 
                Our journey began with a simple mission: to source the world&apos;s finest coffees 
                and roast them to perfection.
              </p>
              <p className="text-gray-600 mb-6">
                From the mountains of Ethiopia to the valleys of Colombia, we work directly 
                with farmers who share our commitment to quality and sustainability.
              </p>
              <Link
                href="/about/story"
                className="inline-flex items-center gap-2 text-black font-medium link-underline"
              >
                Learn Our Story
                <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">☕</div>
                <p className="text-gray-600">Coffee Roasting Process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8 py-20 md:py-24">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 md:p-20 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-cursive text-2xl text-gray-700 mb-2">For Business</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Wholesale Partners</h2>
            <p className="text-lg mb-8 text-gray-700">
              Serve exceptional coffee at your cafe, restaurant, or office. 
              We offer competitive pricing, training, and equipment support.
            </p>
            <Link
              href="/wholesale"
              className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}