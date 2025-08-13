"use client";

import Link from "next/link";
import { Coffee, Package, Truck, Star } from "lucide-react";

const quickLinks = [
  {
    icon: Coffee,
    title: "Shop All Coffee",
    description: "Browse our complete collection",
    href: "/shop/all",
  },
  {
    icon: Package,
    title: "Subscriptions",
    description: "Never run out, save 15%",
    href: "/subscribe",
  },
  {
    icon: Star,
    title: "New Arrivals",
    description: "Latest seasonal offerings",
    href: "/shop/all",
  },
  {
    icon: Truck,
    title: "Wholesale",
    description: "Partner with us",
    href: "/wholesale",
  },
];

export default function QuickLinks() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="group text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                    <Icon className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-gray-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}