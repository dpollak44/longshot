"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "New Arrival: Ethiopia Yirgacheffe",
    subtitle: "Bright, floral notes with hints of lemon",
    cta: "Shop Now",
    ctaLink: "/shop/single-origin",
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
  },
  {
    id: 2,
    title: "Subscribe & Save 15%",
    subtitle: "Never run out of your favorite coffee",
    cta: "Start Subscription",
    ctaLink: "/subscribe",
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    id: 3,
    title: "Wholesale Partners",
    subtitle: "Premium coffee for your business",
    cta: "Learn More",
    ctaLink: "/wholesale",
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
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`h-full ${slide.bgColor} flex items-center justify-center`}>
            <div className="container text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                {slide.subtitle}
              </p>
              <Link
                href={slide.ctaLink}
                className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
              >
                {slide.cta}
              </Link>
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