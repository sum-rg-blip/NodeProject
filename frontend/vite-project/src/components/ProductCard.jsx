import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onOrder }) => (
    <div className="product-card">
        <button className="wishlist-btn"><Heart size={18} /></button>
        <div className="product-image">
            <img src={product.image} alt={product.brand} />
        </div>
        <div className="product-info">
            <div className="brand-info">
                <h3>{product.brand}</h3>
                <span>{product.category}</span>
            </div>
            <div className="price-row">
                <span className="price">${product.price}</span>
                <button className="shop-btn" onClick={() => onOrder(product)}>
                    GO SHOP <ShoppingCart size={16} />
                </button>
            </div>
        </div>
    </div>
);

export default ProductCard;
