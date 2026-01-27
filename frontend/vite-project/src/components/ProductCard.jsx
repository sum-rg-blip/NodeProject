import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product, onOrder }) => {
  return (
    <div className="product-card">
      <button className="wishlist-btn">
        <Heart size={18} />
      </button>

      <div className="product-image">
        <img src={product.image} alt={product.brand} />
      </div>

      <div className="product-info">
        <h3>{product.brand}</h3>
        <p>{product.category}</p>

        <div className="price-row">
          <span>${product.price}</span>
          <button className="shop-btn" onClick={() => onOrder(product)}>
            Add to Cart <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
