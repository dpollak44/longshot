import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LONGSHOT COFFEE</h3>
            <p className="text-sm text-gray-400 mb-4">
              Exceptional coffee for curious people. Ethically sourced, expertly roasted.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/all" className="text-gray-400 hover:text-white transition-colors">
                  All Coffee
                </Link>
              </li>
              <li>
                <Link href="/shop/single-origin" className="text-gray-400 hover:text-white transition-colors">
                  Single Origin
                </Link>
              </li>
              <li>
                <Link href="/shop/blends" className="text-gray-400 hover:text-white transition-colors">
                  Blends
                </Link>
              </li>
              <li>
                <Link href="/shop/equipment" className="text-gray-400 hover:text-white transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-gray-400 hover:text-white transition-colors">
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn/brew-guides" className="text-gray-400 hover:text-white transition-colors">
                  Brew Guides
                </Link>
              </li>
              <li>
                <Link href="/learn/education" className="text-gray-400 hover:text-white transition-colors">
                  Coffee Education
                </Link>
              </li>
              <li>
                <Link href="/about/story" className="text-gray-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/learn/sourcing" className="text-gray-400 hover:text-white transition-colors">
                  Sourcing
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-gray-400 hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start text-gray-400">
                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  123 Coffee Street<br />
                  Portland, OR 97201
                </span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>(503) 555-0100</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <a href="mailto:hello@longshotcoffee.com" className="hover:text-white transition-colors">
                  hello@longshotcoffee.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Longshot Coffee Company. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;