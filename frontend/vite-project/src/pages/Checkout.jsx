// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// export default function Checkout() {
//   const { cart, total, clearCart } = useCart();
//   const navigate = useNavigate();

//   // store return reasons per product
//   const [returnReasons, setReturnReasons] = useState({});
//   const [returned, setReturned] = useState({});

//   if (cart.length === 0) {
//     return (
//       <div className="container section text-center">
//         <h2>No confirmed orders</h2>
//       </div>
//     );
//   }

//   const handleReturn = (id) => {
//     if (!returnReasons[id] || returnReasons[id].trim() === "") {
//       alert("Please provide a reason to return this product.");
//       return;
//     }

//     setReturned((prev) => ({ ...prev, [id]: true }));
//   };

//   return (
//     <div className="container section">
//       <h2>Order Confirmed ✅</h2>

//       <div className="orders-list">
//         {cart.map((item) => (
//           <div className="order-item" key={item.id}>
//             {/* LEFT SIDE */}
//             <div className="order-details">
//               <img
//                 src={item.image}
//                 alt={item.brand}
//                 style={{ width: 80, height: 80, objectFit: "contain" }}
//               />

//               <div>
//                 <p><strong>{item.brand}</strong></p>
//                 <p>Qty: {item.qty}</p>
//                 <p>${item.price}</p>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div style={{ width: "40%" }}>
//               {returned[item.id] ? (
//                 <p style={{ color: "green", fontWeight: "600" }}>
//                   Returned ✔
//                 </p>
//               ) : (
//                 <>
//                   <textarea
//                     placeholder="Reason to return"
//                     value={returnReasons[item.id] || ""}
//                     onChange={(e) =>
//                       setReturnReasons({
//                         ...returnReasons,
//                         [item.id]: e.target.value,
//                       })
//                     }
//                     style={{ width: "100%", minHeight: 70 }}
//                   />

//                   <button
//                     className="btn-pill btn-outline"
//                     style={{ marginTop: 10 }}
//                     onClick={() => handleReturn(item.id)}
//                   >
//                     Return
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <h3 style={{ marginTop: "2rem" }}>
//         Total Paid: ${total.toFixed(2)}
//       </h3>
//     <button
//     className="btn-pill btn-outline"
//     style={{ marginTop: "2rem" }}
//     onClick={() => {
//         clearCart();
//         navigate("/products");
//     }}
//     >
//     Back to Products
// </button>

//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [returnReasons, setReturnReasons] = useState({});
  const [returned, setReturned] = useState({});

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">No confirmed orders</h2>
      </div>
    );
  }

  const handleReturn = (id) => {
    if (!returnReasons[id] || returnReasons[id].trim() === "") {
      alert("Please provide a reason to return this product.");
      return;
    }
    setReturned((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">
        Order Confirmed ✅
      </h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-start bg-white rounded-2xl p-4 shadow-sm transition hover:shadow-md"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.brand}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50"
              />

              <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-900">{item.brand}</p>
                <p className="text-gray-500">Qty: {item.qty}</p>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-2/5 mt-4 md:mt-0 flex flex-col">
              {returned[item.id] ? (
                <p className="text-green-600 font-semibold">Returned ✔</p>
              ) : (
                <>
                  <textarea
                    placeholder="Reason to return"
                    value={returnReasons[item.id] || ""}
                    onChange={(e) =>
                      setReturnReasons({
                        ...returnReasons,
                        [item.id]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-black"
                  />

                  <button
                    className="mt-3 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full font-medium transition"
                    onClick={() => handleReturn(item.id)}
                  >
                    Return
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          Total Paid: ${total.toFixed(2)}
        </h3>

        <button
          className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-900 transition"
          onClick={() => {
            clearCart();
            navigate("/products");
          }}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}
