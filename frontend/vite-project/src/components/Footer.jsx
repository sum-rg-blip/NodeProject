import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer  section">
      <div className="footer-container ">
        {/* Brand */}
        <div className="footer-col">
          <h3 className="footer-logo">PHARMACY</h3>
          <p className="footer-text">
            Trusted healthcare products and expert solutions for your everyday
            wellness.
          </p>
          <div className="footer-socials">
            <Facebook size={18} />
            <Twitter size={18} />
            <Instagram size={18} />
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li>Healthcare</li>
            <li>Supplements</li>
            <li>Skin Care</li>
            <li>Pharma</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p><MapPin size={16} /> New York, USA</p>
          <p><Phone size={16} /> +1 234 567 890</p>
          <p><Mail size={16} /> support@pharmacy.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PHARMACY. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
