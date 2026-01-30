// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// export default function Cart() {
//   const { user, setAuthOpen } = useAuth();
//   const { cart, inc, dec, remove, total, confirmOrder } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       setAuthOpen(true);
//       navigate("/products");
//     }
//   }, [user]);

//   if (!user) return null;

//    return (
//     <div className="container section">
//       <h2>Your Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-center">Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="orders-list">
//             {cart.map((item) => (
//               <div className="order-item" key={item.id} style={{ gap: "1rem" }}>
//                 <div
//                   className="order-details"
//                   style={{ display: "flex", gap: "1rem", alignItems: "center" }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.brand}
//                     style={{ width: 80, height: 80, objectFit: "contain" }}
//                   />

//                   <div>
//                     <p><strong>{item.brand}</strong></p>
//                     <p>${item.price}</p>

//                     <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
//                       <button onClick={() => dec(item.id)}>-</button>
//                       <span style={{ fontWeight: 700 }}>{item.qty}</span>
//                       <button onClick={() => inc(item.id)}>+</button>
//                       <button onClick={() => remove(item.id)}>Remove</button>
//                     </div>
//                   </div>
//                 </div>

//                 <p style={{ fontWeight: 800 }}>
//                   ${(Number(item.price) * item.qty).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <h3 style={{ marginTop: "2rem" }}>
//             Total: ${total.toFixed(2)}
//           </h3>

//           <button
//             className="btn-pill btn-outline"
//             style={{ marginTop: "1rem" }}
//             onClick={() => {
//               confirmOrder();
//               navigate("/checkout");
//             }}
//           >
//             Confirm Order
//           </button>
//         </>
//       )}
//     </div>
//   );
// }


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { user, setAuthOpen } = useAuth();
  const { cart, inc, dec, remove, total, confirmOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setAuthOpen(true);
      navigate("/products");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm transition hover:shadow-md"
              >
                {/* Item details */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.brand}
                    className="w-20 h-20 object-contain rounded-xl bg-gray-50"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-gray-900">{item.brand}</p>
                    <p className="text-gray-500">${item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dec(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                      >
                        -
                      </button>

                      <span className="font-bold w-6 text-center">{item.qty}</span>

                      <button
                        onClick={() => inc(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                      >
                        +
                      </button>

                      <button
                        onClick={() => remove(item.id)}
                        className="ml-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item total */}
                <p className="font-extrabold text-gray-900">
                  ${(Number(item.price) * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Cart summary */}
          <div className="mt-8 flex flex-col items-end gap-4">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>

            <button
              onClick={() => {
                confirmOrder();
                navigate("/checkout");
              }}
              className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-900 transition"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
