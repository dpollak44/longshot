"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const navigation = [
    {
      name: "Shop",
      href: "/shop",
      dropdown: [
        { name: "All Coffee", href: "/shop/all" },
        { name: "Single Origin", href: "/shop/single-origin" },
        { name: "Blends", href: "/shop/blends" },
        { name: "Decaf", href: "/shop/decaf" },
        { name: "Merchandise", href: "/shop/merchandise" },
        { name: "Equipment", href: "/shop/equipment" },
      ],
    },
    {
      name: "Subscribe",
      href: "/subscribe",
      dropdown: [
        { name: "Coffee Subscriptions", href: "/subscribe/coffee" },
        { name: "Gift Subscriptions", href: "/subscribe/gift" },
        { name: "Manage Subscription", href: "/subscribe/manage" },
      ],
    },
    {
      name: "Wholesale",
      href: "/wholesale",
      dropdown: null,
    },
    {
      name: "Learn",
      href: "/learn",
      dropdown: [
        { name: "Brew Guides", href: "/learn/brew-guides" },
        { name: "Coffee Education", href: "/learn/education" },
        { name: "Our Process", href: "/learn/process" },
        { name: "Sourcing", href: "/learn/sourcing" },
      ],
    },
    {
      name: "About",
      href: "/about",
      dropdown: [
        { name: "Our Story", href: "/about/story" },
        { name: "Locations", href: "/about/locations" },
        { name: "Team", href: "/about/team" },
        { name: "Contact", href: "/about/contact" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center ml-4 md:ml-0">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">
                LONGSHOT
              </span>
              <span className="font-cursive ml-2 text-sm md:text-base tracking-wide">
                Coffee Co.
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout);
                    setDropdownTimeout(null);
                  }
                  setActiveDropdown(item.name);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 100);
                  setDropdownTimeout(timeout);
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-medium hover:text-gray-600 transition-colors py-2"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown size={16} className="ml-1" />}
                </Link>
                
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 -mt-1">
                    <div className="pt-1">
                      <div className="w-48 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={20} />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="bg-gray-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-8 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;