"use client";

import { useState } from "react";
import { Heart, Share2, Coffee } from "lucide-react";

interface GalleryItem {
  id: number;
  type: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  height: string;
  likes?: number;
  category?: string;
  content?: string;
  author?: string;
  bgColor?: string;
  price?: string;
  notes?: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    title: "Morning Brew Ritual",
    description: "The perfect pour over technique",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop",
    height: "h-64",
    likes: 234,
    category: "brewing",
  },
  {
    id: 2,
    type: "image",
    title: "Ethiopian Harvest",
    description: "Direct from our partner farms in Yirgacheffe",
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=600&fit=crop",
    height: "h-96",
    likes: 892,
    category: "origin",
  },
  {
    id: 3,
    type: "quote",
    content: "Coffee is a language in itself.",
    author: "Jackie Chan",
    height: "h-48",
    bgColor: "bg-black text-white",
  },
  {
    id: 4,
    type: "image",
    title: "Latte Art Championship",
    description: "Our barista's award-winning tulip design",
    imageUrl: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&h=500&fit=crop",
    height: "h-80",
    likes: 567,
    category: "cafe",
  },
  {
    id: 5,
    type: "image",
    title: "Roasting Process",
    description: "Small batch perfection at 420°F",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=450&fit=crop",
    height: "h-72",
    likes: 445,
    category: "roasting",
  },
  {
    id: 6,
    type: "feature",
    title: "New Colombia Geisha",
    price: "$32",
    notes: ["Jasmine", "Peach", "Honey"],
    height: "h-64",
    bgColor: "bg-yellow-50",
  },
  {
    id: 7,
    type: "image",
    title: "Coffee Cupping Session",
    description: "Weekly tastings every Saturday",
    imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&h=350&fit=crop",
    height: "h-56",
    likes: 123,
    category: "events",
  },
  {
    id: 8,
    type: "quote",
    content: "Life happens, coffee helps.",
    author: "Anonymous",
    height: "h-40",
    bgColor: "bg-gray-900 text-white",
  },
  {
    id: 9,
    type: "image",
    title: "Kenya AA Single Origin",
    description: "Blackcurrant and wine notes",
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=600&fit=crop",
    height: "h-96",
    likes: 789,
    category: "coffee",
  },
  {
    id: 10,
    type: "image",
    title: "Chemex Collection",
    description: "Classic brewing elegance",
    imageUrl: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=500&h=400&fit=crop",
    height: "h-64",
    likes: 334,
    category: "equipment",
  },
  {
    id: 11,
    type: "feature",
    title: "Subscribe & Save",
    price: "15% OFF",
    notes: ["Free Shipping", "Flexible Schedule", "Cancel Anytime"],
    height: "h-72",
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    id: 12,
    type: "image",
    title: "Cafe Interior",
    description: "Visit our Portland roastery",
    imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&h=500&fit=crop",
    height: "h-80",
    likes: 901,
    category: "cafe",
  },
];

export default function GallerySection() {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === "image" && item.category === filter);

  const categories = ["all", "brewing", "origin", "roasting", "coffee", "cafe", "equipment", "events"];

  return (
    <section className="container px-4 md:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Coffee Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Explore our world of coffee through moments, methods, and memories
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${
                filter === cat
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`break-inside-avoid-column mb-4 ${item.height} relative group overflow-hidden rounded-lg transition-transform hover:scale-[1.02]`}
          >
            {item.type === "image" && (
              <div className="relative h-full bg-gray-200">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Coffee image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <Coffee size={40} className="text-gray-500" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={20}
                        className={likedItems.includes(item.id) ? "fill-red-500 text-red-500" : ""}
                      />
                      <span className="text-sm">{(item.likes || 0) + (likedItems.includes(item.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button className="hover:scale-110 transition-transform">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                {item.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-black text-xs font-medium rounded-full capitalize">
                    {item.category}
                  </span>
                )}
              </div>
            )}
            
            {item.type === "quote" && (
              <div className={`h-full ${item.bgColor} flex flex-col items-center justify-center p-6 text-center`}>
                <blockquote className="text-xl font-medium mb-3">
                  &ldquo;{item.content}&rdquo;
                </blockquote>
                <cite className="text-sm opacity-75">— {item.author}</cite>
              </div>
            )}
            
            {item.type === "feature" && (
              <div className={`h-full ${item.bgColor} p-6 flex flex-col justify-between`}>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-2xl font-bold mb-4">{item.price}</p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.notes?.map((note, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/80 text-sm rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-black text-white py-2 font-medium hover:bg-gray-800 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}