"use client";

import { useState } from "react";
import { Building, Coffee, Users, Truck, Award, Phone } from "lucide-react";

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    volume: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! We'll be in touch within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Wholesale Partners</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join hundreds of cafes, restaurants, and offices serving exceptional Longshot coffee. 
          We offer competitive pricing, flexible ordering, and comprehensive support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee size={32} className="text-black" />
          </div>
          <h3 className="font-semibold mb-2">Premium Coffee</h3>
          <p className="text-sm text-gray-600">
            Exclusive blends and single origins roasted specifically for your business
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-black" />
          </div>
          <h3 className="font-semibold mb-2">Training & Support</h3>
          <p className="text-sm text-gray-600">
            Barista training, equipment support, and ongoing consultation
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={32} className="text-black" />
          </div>
          <h3 className="font-semibold mb-2">Flexible Delivery</h3>
          <p className="text-sm text-gray-600">
            Weekly deliveries with no minimum order requirements
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Partner with Longshot?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Award size={24} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Award-Winning Coffee</h3>
              <p className="text-sm text-gray-600">
                Consistently rated among the top roasters in the country
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Building size={24} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Custom Blends</h3>
              <p className="text-sm text-gray-600">
                We can create a signature blend exclusive to your business
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone size={24} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Dedicated Support</h3>
              <p className="text-sm text-gray-600">
                Personal account manager and 24/7 customer service
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Coffee size={24} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Equipment Program</h3>
              <p className="text-sm text-gray-600">
                Discounted equipment and maintenance support
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Get Started</h2>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Name *</label>
              <input
                type="text"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name *</label>
              <input
                type="text"
                name="contactName"
                required
                value={formData.contactName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Type *</label>
              <select
                name="businessType"
                required
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              >
                <option value="">Select...</option>
                <option value="cafe">Cafe</option>
                <option value="restaurant">Restaurant</option>
                <option value="office">Office</option>
                <option value="hotel">Hotel</option>
                <option value="retail">Retail Store</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Weekly Volume</label>
              <select
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              >
                <option value="">Select...</option>
                <option value="5-10">5-10 lbs</option>
                <option value="10-25">10-25 lbs</option>
                <option value="25-50">25-50 lbs</option>
                <option value="50+">50+ lbs</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="Tell us about your business and coffee needs..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            Submit Wholesale Inquiry
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Prefer to talk? Call us at <a href="tel:503-555-0100" className="underline">(503) 555-0100</a>
        </p>
      </div>
    </div>
  );
}