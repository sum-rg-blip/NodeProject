import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, setAuthOpen, logout } = useAuth();
  const { cart, inc, dec, remove, total } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar container">
      <Link to="/" className="logo">PHARMACY</Link>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="nav-actions">
        {/* CART ICON */}
        <div className="cart-wrapper">
          <button className="cart-icon" onClick={() => setOpen(!open)}>
            <ShoppingCart />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>

          {/* MINI CART */}
          {open && (
            <div className="mini-cart">
              {cart.length === 0 ? (
                <p className="text-center">Cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="mini-cart-item">
                      <img src={item.image} alt={item.brand} />

                      <div>
                        <p className="bold">{item.brand}</p>
                        <div className="qty-controls">
                          <button onClick={() => dec(item.id)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => inc(item.id)}>+</button>
                        </div>
                      </div>

                      <button className="remove" onClick={() => remove(item.id)}>
                        ✕
                      </button>
                    </div>
                  ))}

                  <p className="total">Total: ${total.toFixed(2)}</p>

                  <button
                    className="btn-confirm"
                    onClick={() => {
                      setOpen(false);
                      navigate("/checkout");
                    }}
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* AUTH */}
        {user ? (
          <div className="user-profile">
            <User size={18} />
            <span>{user.name.split(" ")[0]}</span>
            <button className="btn-icon" onClick={logout}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button className="btn-pill btn-outline" onClick={() => setAuthOpen(true)}>
            Join Us
          </button>
        )}
      </div>
    </nav>
  );
}
