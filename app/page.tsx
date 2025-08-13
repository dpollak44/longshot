import HeroSlideshow from "@/components/HeroSlideshow";
import ProductCard from "@/components/ProductCard";
import GallerySection from "@/components/GallerySection";
import Link from "next/link";
import { ArrowRight, Package, Truck, Award, Coffee } from "lucide-react";

const featuredCoffees = [
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
    id: "house-blend",
    name: "Longshot House Blend",
    origin: "Central & South America",
    price: 18.00,
    notes: ["Chocolate", "Caramel", "Nuts"],
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
];

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32">
      <HeroSlideshow />
      
      <section className="container px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">This Week&apos;s Featured Coffees</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of exceptional coffees from around the world.
            Each bag tells a story of origin, craftsmanship, and flavor.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredCoffees.map((coffee) => (
            <ProductCard key={coffee.id} {...coffee} />
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/shop/all"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            View All Coffee
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <div className="py-12 md:py-16">
        <GallerySection />
      </div>

      <section className="bg-gray-50 py-24 md:py-32">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Choose Longshot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="text-black" size={36} />
              </div>
              <h3 className="font-semibold text-lg mb-3">Expertly Roasted</h3>
              <p className="text-gray-600">
                Small-batch roasted to perfection to bring out each coffee&apos;s unique characteristics
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-black" size={36} />
              </div>
              <h3 className="font-semibold text-lg mb-3">Ethically Sourced</h3>
              <p className="text-gray-600">
                Direct trade relationships ensuring fair prices for farmers and exceptional quality
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-black" size={36} />
              </div>
              <h3 className="font-semibold text-lg mb-3">Freshness Guaranteed</h3>
              <p className="text-gray-600">
                Roasted to order and shipped within 24 hours for maximum freshness
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-black" size={36} />
              </div>
              <h3 className="font-semibold text-lg mb-3">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on orders over $40. Subscribe and save an additional 15%
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8">
        <div className="bg-black text-white p-12 md:p-20 rounded-lg shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Exceptional Coffee, Curious People</h2>
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

      <section className="container px-4 md:px-8 pb-12 md:pb-16">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-12 md:p-20 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Wholesale Partners</h2>
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