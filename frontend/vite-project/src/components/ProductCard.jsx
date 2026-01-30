// import React from 'react';
// import { ShoppingCart, Heart } from 'lucide-react';

// const ProductCard = ({ product, onOrder }) => {
//   return (
//     <div className="product-card">
//       <button className="wishlist-btn">
//         <Heart size={18} />
//       </button>

//       <div className="product-image">
//         <img src={product.image} alt={product.brand} />
//       </div>

//       <div className="product-info">
//         <h3>{product.brand}</h3>
//         <p>{product.category}</p>

//         <div className="price-row">
//           <span>${product.price}</span>
//           <button className="shop-btn" onClick={() => onOrder(product)}>
//             Add to Cart <ShoppingCart size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product, onOrder }) => {
  return (
    <div className="product-card bg-white border border-gray-200 rounded-3xl p-6 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <button className="wishlist-btn absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
        <Heart size={18} />
      </button>

      <div className="product-image h-44 flex items-center justify-center mb-5">
        <img
          src={product.image}
          alt={product.brand}
          className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="product-info space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          {product.brand}
        </h3>

        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        <div className="price-row flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <button
            className="shop-btn flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs font-semibold transition hover:bg-black hover:text-white"
            onClick={() => onOrder(product)}
          >
            Add to Cart
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
