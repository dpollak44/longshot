"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  bgImage?: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "New Arrival: Ethiopia Yirgacheffe",
    subtitle: "Bright, floral notes with hints of lemon",
    cta: "Shop Now",
    ctaLink: "/shop/single-origin",
    bgImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=800&fit=crop",
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
  },
  {
    id: 2,
    title: "Subscribe & Save 15%",
    subtitle: "Never run out of your favorite coffee",
    cta: "Start Subscription",
    ctaLink: "/subscribe",
    bgImage: "https://images.unsplash.com/photo-1497515114628-676f0090d8b7?w=1920&h=800&fit=crop",
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    id: 3,
    title: "Wholesale Partners",
    subtitle: "Premium coffee for your business",
    cta: "Learn More",
    ctaLink: "/wholesale",
    bgImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&h=800&fit=crop",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="h-full relative">
            {slide.bgImage ? (
              <>
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </>
            ) : (
              <div className={`absolute inset-0 ${slide.bgColor}`} />
            )}
            <div className="relative h-full flex items-center justify-center px-4">
              <div className="container text-center max-w-4xl">
                <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight ${slide.bgImage ? 'text-white drop-shadow-lg' : 'text-black'}`}>
                  {slide.title}
                </h1>
                <p className={`font-cursive text-2xl md:text-3xl mb-10 max-w-2xl mx-auto ${slide.bgImage ? 'text-gray-100 drop-shadow' : 'text-gray-700'}`}>
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaLink}
                  className={`inline-block px-10 py-4 text-lg font-medium transition-all transform hover:scale-105 ${
                    slide.bgImage 
                      ? 'bg-white text-black hover:bg-gray-100 shadow-xl' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;