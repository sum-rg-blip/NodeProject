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
        <div className="container mx-auto py-10 px-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Health Shop</h1>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
                    {/* SEARCH BAR */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-full md:w-auto">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent outline-none w-full text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {/* FILTER */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-full md:w-auto">
                        <Filter size={18} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-transparent outline-none text-gray-900"
                        >
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

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onOrder={onOrder} />
                ))}
            </div>

            {/* NO RESULTS */}
            {filteredProducts.length === 0 && (
                <div className="mt-8 text-center text-gray-500">
                    <p>No products found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
