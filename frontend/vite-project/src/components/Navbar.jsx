import React from 'react';
import { Link } from 'react-router-dom';
import { Package, User, LogOut } from 'lucide-react';

const Navbar = ({ user, ordersCount, setShowOrders, setShowAuth, setIsLogin, logout }) => {
  return (
    <nav className="navbar container">
      <Link to="/" className="logo">PHARMACY</Link>

      <div className="nav-links">
        <Link to="/home">Home</Link>
<Link to="/products">Product</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-menu">
            <button className="btn-icon" onClick={() => setShowOrders(prev => !prev)}>
              <Package size={20} /> Orders ({ordersCount})
            </button>

            <div className="user-profile">
              <User size={20} />
              <span>{user.name.split(' ')[0]}</span>
              <button className="btn-icon" onClick={logout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn-pill btn-outline"
            onClick={() => {
              setShowAuth(true);
              setIsLogin(true);
            }}
          >
            Join Us
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
