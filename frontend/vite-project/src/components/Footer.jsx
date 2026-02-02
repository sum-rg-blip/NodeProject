import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-gray-900">STORE PHARMACY</h3>
          <p className="text-gray-600 text-sm">
            Trusted healthcare products and expert solutions for your everyday wellness.
          </p>
          <div className="flex gap-4 mt-2">
            <Facebook size={20} className="hover:text-blue-600 transition" />
            <Twitter size={20} className="hover:text-blue-400 transition" />
            <Instagram size={20} className="hover:text-pink-500 transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-900 mb-2">Quick Links</h4>
          <ul className="flex flex-col gap-1">
            <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-gray-900 transition">Products</Link></li>
            <li><Link to="/contact" className="hover:text-gray-900 transition">Contact</Link></li>
            <li><Link to="/about" className="hover:text-gray-900 transition">About Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-900 mb-2">Categories</h4>
          <ul className="flex flex-col gap-1">
            <li>Healthcare</li>
            <li>Supplements</li>
            <li>Skin Care</li>
            <li>Pharma</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
          <p className="flex items-center gap-2">
            <MapPin size={16} /> New York, USA
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> +1 234 567 890
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} /> support@pharmacy.com
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} PHARMACY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
