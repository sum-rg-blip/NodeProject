// export default ProductsPage;
import React, { useState } from "react";
import { Search, Filter, ArrowRight, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import {
  categories,
  allProducts,
  seasonalSolutions,
  reviews,
} from "../data/mockData";

import dr1 from "../assets/dr1.png";
import dr2 from "../assets/dr2.png";

const ProductsPage = ({ onOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const featuredProducts = allProducts.slice(0, 4);
  const bestSellers = allProducts.slice(0, 8);

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.brand
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Our Popular Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center hover:scale-105 transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <p className="font-semibold text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BEST OFFER ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Today’s Best Offer <br /> Just For You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={onOrder}
            />
          ))}
        </div>
      </section>

      {/* ================= SEASONAL SOLUTIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-semibold mb-12">
          Our Seasonal <br /> Exclusive Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalSolutions.map((solution) => (
            <div
              key={solution.id}
              className="relative bg-pink-50 rounded-3xl p-8 min-h-[220px] overflow-hidden"
            >
              <h3 className="text-sm font-semibold mb-6">
                {solution.title}
              </h3>

              <button className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full text-sm font-medium border hover:bg-gray-100 transition">
                See more <ArrowRight size={16} />
              </button>

              <img
                src={solution.image}
                alt={solution.title}
                className="absolute bottom-0 right-0 w-1/3"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Our Best Seller Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={onOrder}
            />
          ))}
        </div>
      </section>

      {/* ================= SHOP ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-14">
          <h1 className="text-5xl font-bold">All Products</h1>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <Search size={18} />
              <input
                className="bg-transparent outline-none text-sm"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <Filter size={18} />
              <select
                className="bg-transparent outline-none text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={onOrder}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No products found matching your search.
          </p>
        )}
      </section>
    </>
  );
};

export default ProductsPage;
