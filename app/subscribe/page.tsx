import Link from "next/link";
import { Check, Coffee, Truck, Calendar } from "lucide-react";
import { getProducts } from "@/lib/shopify";

export default async function SubscribePage() {
  // Fetch subscription-enabled products from Shopify
  const allProducts = await getProducts({ first: 50 });
  
  // Filter for subscription-available products
  const subscriptionProducts = allProducts.filter((product: { tags: string[] }) => 
    product.tags.includes('subscription-available')
  );

  const benefits = [
    { icon: Coffee, text: "Save 15-20% on every order" },
    { icon: Truck, text: "Free shipping on all subscriptions" },
    { icon: Calendar, text: "Flexible delivery schedules" },
  ];

  const frequencies = [
    { 
      name: "Weekly", 
      description: "Perfect for offices and heavy drinkers",
      discount: "20% OFF",
      popular: false
    },
    { 
      name: "Bi-Weekly", 
      description: "Our most popular option",
      discount: "15% OFF",
      popular: true
    },
    { 
      name: "Monthly", 
      description: "Great for occasional coffee lovers",
      discount: "15% OFF",
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/20 to-yellow-50 py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-cursive text-3xl text-gray-700 mb-2">Never Run Out</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Subscribe & Save
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Get your favorite coffee delivered on your schedule. 
              Save up to 20% on every order, with free shipping always included.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <benefit.icon className="w-5 h-5 text-accent" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-b">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="font-cursive text-2xl text-gray-600 mb-2">Simple Process</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose Your Coffee</h3>
              <p className="text-gray-600">
                Select from our range of single-origin and blended coffees
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Pick Your Schedule</h3>
              <p className="text-gray-600">
                Weekly, bi-weekly, or monthly delivery options available
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Enjoy & Save</h3>
              <p className="text-gray-600">
                Fresh coffee delivered to your door with exclusive savings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Options */}
      <section className="py-20">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="font-cursive text-2xl text-gray-600 mb-2">Choose Your Plan</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Subscription Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {frequencies.map((freq) => (
              <div 
                key={freq.name}
                className={`border-2 p-8 rounded-lg relative ${
                  freq.popular ? 'border-accent shadow-lg' : 'border-gray-200'
                }`}
              >
                {freq.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent px-4 py-1 text-sm font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="font-bold text-2xl mb-2">{freq.name}</h3>
                <p className="text-gray-600 mb-4">{freq.description}</p>
                <p className="text-3xl font-bold text-accent mb-6">{freq.discount}</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Free shipping included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Pause or cancel anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Exclusive subscriber perks</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Available Products */}
          <div className="border-t pt-16">
            <h3 className="font-serif text-2xl font-bold mb-8 text-center">
              Available for Subscription
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptionProducts.slice(0, 6).map((product: { id: string; handle: string; title: string; description: string; priceRange: { minVariantPrice: { amount: string } }; featuredImage?: { url: string } }) => {
                const basePrice = parseFloat(product.priceRange.minVariantPrice.amount);
                const weeklyPrice = (basePrice * 0.80).toFixed(2);
                const monthlyPrice = (basePrice * 0.85).toFixed(2);
                
                return (
                  <div key={product.id} className="border rounded-lg overflow-hidden">
                    {product.featuredImage && (
                      <div className="h-48 bg-gray-100">
                        <img 
                          src={product.featuredImage.url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-2">{product.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>One-time:</span>
                          <span className="font-medium">${basePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Weekly (Save 20%):</span>
                          <span className="font-medium">${weeklyPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Monthly (Save 15%):</span>
                          <span className="font-medium">${monthlyPrice}</span>
                        </div>
                      </div>
                      <Link
                        href={`/shop/product/${product.handle}?subscribe=true`}
                        className="block text-center bg-black text-white py-2 hover:bg-gray-800 transition-colors"
                      >
                        Subscribe Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {subscriptionProducts.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  href="/shop/all?filter=subscription"
                  className="inline-block bg-accent text-black px-8 py-3 font-medium hover:bg-yellow-500 transition-colors"
                >
                  View All Subscription Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-cursive text-2xl text-gray-600 mb-2">Questions?</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Subscription FAQ</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Can I pause or cancel my subscription?</h3>
                <p className="text-gray-600">
                  Yes! You can pause, skip, or cancel your subscription anytime from your account dashboard. 
                  No questions asked.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Can I change my coffee selection?</h3>
                <p className="text-gray-600">
                  Absolutely. You can switch between any of our subscription-eligible coffees 
                  at any time. Changes take effect with your next delivery.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">When will my subscription renew?</h3>
                <p className="text-gray-600">
                  Your subscription will automatically renew based on your chosen frequency 
                  (weekly, bi-weekly, or monthly). You&apos;ll receive an email reminder 3 days before each shipment.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Do I get the discount on my first order?</h3>
                <p className="text-gray-600">
                  Yes! Your subscription discount applies immediately, starting with your very first order. 
                  Plus, shipping is always free for subscribers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Start Your Coffee Journey Today
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Join thousands of coffee lovers who never run out of their favorite brew. 
              First-time subscribers get an extra 10% off their first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="bg-accent text-black px-8 py-3 font-medium hover:bg-yellow-500 transition-colors"
              >
                Start Subscription
              </Link>
              <Link
                href="/shop/all"
                className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                Browse All Coffee
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}