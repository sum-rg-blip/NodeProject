// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, User, LogOut } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";

// export default function Navbar() {
//   const { user, setAuthOpen, logout } = useAuth();
//   const { cart, inc, dec, remove, total } = useCart();
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <nav className="navbar container">
//       <Link to="/" className="logo">PHARMACY</Link>

//       <div className="nav-links">
//         <Link to="/home">Home</Link>
//         <Link to="/products">Products</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/about">About Us</Link>
//       </div>

//       <div className="nav-actions">
//         {/* CART ICON */}
//         <div className="cart-wrapper">
//           <button className="cart-icon" onClick={() => setOpen(!open)}>
//             <ShoppingCart />
//             {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
//           </button>

//           {/* MINI CART */}
//           {open && (
//             <div className="mini-cart">
//               {cart.length === 0 ? (
//                 <p className="text-center">Cart is empty</p>
//               ) : (
//                 <>
//                   {cart.map((item) => (
//                     <div key={item.id} className="mini-cart-item">
//                       <img src={item.image} alt={item.brand} />

//                       <div>
//                         <p className="bold">{item.brand}</p>
//                         <div className="qty-controls">
//                           <button onClick={() => dec(item.id)}>-</button>
//                           <span>{item.qty}</span>
//                           <button onClick={() => inc(item.id)}>+</button>
//                         </div>
//                       </div>

//                       <button className="remove" onClick={() => remove(item.id)}>
//                         ✕
//                       </button>
//                     </div>
//                   ))}

//                   <p className="total">Total: ${total.toFixed(2)}</p>

//                   <button
//                     className="btn-confirm"
//                     onClick={() => {
//                       setOpen(false);
//                       navigate("/checkout");
//                     }}
//                   >
//                     Confirm
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>

//         {/* AUTH */}
//         {user ? (
//           <div className="user-profile">
//             <User size={18} />
//             <span>{user.name.split(" ")[0]}</span>
//             <button className="btn-icon" onClick={logout}>
//               <LogOut size={16} />
//             </button>
//           </div>
//         ) : (
//           <button className="btn-pill btn-outline" onClick={() => setAuthOpen(true)}>
//             Join Us
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, setAuthOpen, logout } = useAuth();
  const { cart, inc, dec, remove, total } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          PHARMACY
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/home" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-900 transition">Products</Link>
          <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
          <Link to="/about" className="hover:text-gray-900 transition">About Us</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 relative">
          {/* CART ICON */}
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            {/* MINI CART DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-2xl p-4 z-50">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">Cart is empty</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-2">
                          <img
                            src={item.image}
                            alt={item.brand}
                            className="w-12 h-12 object-contain rounded"
                          />
                          <div className="flex-1 flex flex-col gap-1">
                            <p className="font-semibold text-gray-900">{item.brand}</p>
                            <div className="flex items-center gap-2">
                              <button
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => dec(item.id)}
                              >
                                -
                              </button>
                              <span className="font-medium">{item.qty}</span>
                              <button
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => inc(item.id)}
                              >
                                +
                              </button>
                              <button
                                className="text-red-500 font-bold hover:text-red-700"
                                onClick={() => remove(item.id)}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="font-semibold text-gray-900 mt-4">
                      Total: ${total.toFixed(2)}
                    </p>

                    <button
                      className="mt-2 w-full py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition"
                      onClick={() => {
                        setOpen(false);
                        navigate("/checkout");
                      }}
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* AUTH */}
          {user ? (
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-700" />
              <span className="font-medium text-gray-700">{user.name.split(" ")[0]}</span>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                onClick={logout}
              >
                <LogOut size={16} className="text-gray-700" />
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition"
              onClick={() => setAuthOpen(true)}
            >
              Join Us
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
