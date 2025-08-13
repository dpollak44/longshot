import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Longshot Coffee</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            Founded in 2015, Longshot Coffee Company began as a small roastery with a simple mission: 
            to source exceptional coffees and roast them to perfection. What started as a passion project 
            in a garage has grown into a thriving business serving coffee lovers across the country.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To connect coffee lovers with the world&apos;s finest beans while supporting the farmers and 
              communities that make great coffee possible. We believe in transparency, sustainability, 
              and the power of a perfect cup to bring people together.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every bean is carefully selected, expertly roasted, 
                and rigorously tested to ensure it meets our exacting standards.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Direct Trade</h3>
              <p className="text-gray-600">
                We work directly with farmers to ensure fair prices and sustainable practices. 
                This relationship allows us to source the best coffees while supporting communities.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                From compostable packaging to carbon-neutral shipping, we&apos;re committed to minimizing 
                our environmental impact at every step of the process.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Coffee brings people together. We support local communities through education, 
                events, and partnerships with organizations making a positive impact.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">The Team</h2>
          <p className="mb-6">
            Our team of passionate coffee professionals includes Q-graders, roasters, and baristas 
            dedicated to bringing you the best coffee experience possible. From sourcing to roasting 
            to customer service, every member of our team shares a commitment to excellence.
          </p>

          <div className="bg-black text-white p-8 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4">Visit Our Roastery</h2>
            <p className="mb-4">
              Come see where the magic happens. Our roastery is open for tours every Saturday at 10am. 
              Learn about the roasting process, taste different coffees, and meet our team.
            </p>
            <Link
              href="/about/locations"
              className="inline-flex items-center gap-2 text-accent font-medium hover:text-yellow-400 transition-colors"
            >
              Find Our Locations
              <ArrowRight size={20} />
            </Link>
          </div>

          <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
          <ul className="list-disc pl-6 mb-8 text-gray-600">
            <li>2023 - Roaster of the Year, Coffee Review</li>
            <li>2022 - Best New Coffee Subscription, Food & Wine</li>
            <li>2021 - Excellence in Sustainability Award</li>
            <li>2020 - Top 10 Coffee Roasters in America, USA Today</li>
          </ul>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-4">
              Have questions? Want to learn more about our coffee? We&apos;d love to hear from you.
            </p>
            <Link
              href="/about/contact"
              className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}