import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/mockData';

const Shop = ({ onOrder }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredProducts = allProducts.filter(p => {
        const matchesSearch = p.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || p.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="shop-page container">
            <div className="shop-header">
                <h1>Health Shop</h1>
                <div className="shop-tools">
                    <div className="search-bar">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <Filter size={18} />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Supplements">Supplements</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Natural">Natural</option>
                            <option value="Pharma">Pharma</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="product-grid shop-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onOrder={onOrder} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-results">
                    <p>No products found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
