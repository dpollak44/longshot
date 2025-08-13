"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-900 text-white py-2 px-4 text-center relative">
      <div className="container flex items-center justify-center">
        <p className="text-sm">
          <span className="hidden md:inline">Free shipping on orders over $40 • </span>
          <span className="font-medium">New: Colombia Geisha Available</span>
          <span className="hidden md:inline"> • Subscribe and save 15%</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Close announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}