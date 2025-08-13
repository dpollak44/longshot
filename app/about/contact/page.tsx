"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="subscription">Subscription Help</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Visit Our Roastery</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Coffee Street<br />
                    Portland, OR 97201<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:503-555-0100" className="hover:text-black">
                      (503) 555-0100
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Monday - Friday, 9am - 5pm PST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail size={24} className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">
                    General: <a href="mailto:hello@longshotcoffee.com" className="hover:text-black">
                      hello@longshotcoffee.com
                    </a>
                  </p>
                  <p className="text-gray-600">
                    Wholesale: <a href="mailto:wholesale@longshotcoffee.com" className="hover:text-black">
                      wholesale@longshotcoffee.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock size={24} className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Roastery Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 7am - 6pm<br />
                    Saturday: 8am - 5pm<br />
                    Sunday: 8am - 4pm
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Roastery Tours</h3>
              <p className="text-gray-600 mb-4">
                Join us every Saturday at 10am for a free tour of our roasting facility. 
                Learn about our roasting process, taste different coffees, and meet our team.
              </p>
              <button className="text-black font-medium underline">
                Book a Tour
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">What is your return policy?</h3>
              <p className="text-sm text-gray-600">
                We accept returns within 30 days of purchase for unopened products.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Do you ship internationally?</h3>
              <p className="text-sm text-gray-600">
                Currently, we only ship within the United States.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How fresh is your coffee?</h3>
              <p className="text-sm text-gray-600">
                All coffee is roasted to order and shipped within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Can I modify my subscription?</h3>
              <p className="text-sm text-gray-600">
                Yes, you can pause, skip, or cancel your subscription anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}