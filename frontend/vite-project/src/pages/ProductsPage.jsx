// import React, { useState } from 'react';
// import { Search, Filter, ArrowRight, Star } from 'lucide-react';

// import ProductCard from '../components/ProductCard';
// import {
//   categories,
//   allProducts,
//   seasonalSolutions,
//   reviews,
// } from '../data/mockData';

// // ✅ Doctor images
// import dr1 from '../assets/dr1.png';
// import dr2 from '../assets/dr2.png';

// const ProductsPage = ({ onOrder }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('All');

//   const featuredProducts = allProducts.slice(0, 4);
//   const bestSellers = allProducts.slice(0, 8);

//   const filteredProducts = allProducts.filter((p) => {
//     const matchesSearch = p.brand
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesFilter = filter === 'All' || p.category === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <>
//       {/* ================= POPULAR CATEGORIES ================= */}
//       <section className="section container">
//         <h2>Our Popular Categories</h2>
//         <div className="category-grid">
//           {categories.map((cat) => (
//             <div key={cat.id} className="category-item">
//               <div className="category-circle">
//                 <img src={cat.image} alt={cat.name} />
//               </div>
//               <p>{cat.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= TODAY'S BEST OFFER ================= */}
//       <section className="section container">
//         <h2>
//           Todays Best Offer <br /> Just For You
//         </h2>
//         <div className="product-grid">
//           {featuredProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onOrder={onOrder}
//             />
//           ))}
//         </div>
//       </section>

//       {/* ================= SEASONAL SOLUTIONS ================= */}
//       <section className="section container text-center">
//         <h2>
//           Our Seasonal <br /> Exclusive Solutions
//         </h2>
//         <div className="solutions-grid">
//           {seasonalSolutions.map((solution) => (
//             <div key={solution.id} className="solution-card">
//               <div className="solution-content">
//                 <h3>{solution.title}</h3>
//                 <button className="btn-pill btn-secondary">
//                   See more <ArrowRight size={16} />
//                 </button>
//               </div>
//               <div className="solution-image">
//                 <img src={solution.image} alt={solution.title} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= BEST SELLERS ================= */}
//       <section className="section container">
//         <h2>Our Best Seller Products</h2>
//         <div className="product-grid">
//           {bestSellers.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onOrder={onOrder}
//             />
//           ))}
//         </div>
//       </section>

//       {/* ================= ALL PRODUCTS (SHOP) ================= */}
//       <section className="shop-page container">
//         <div className="shop-header">
//           <h1>All Products</h1>

//           <div className="shop-tools">
//             <div className="search-bar">
//               <Search size={18} />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="filter-group">
//               <Filter size={18} />
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               >
//                 <option value="All">All Categories</option>
//                 <option value="Healthcare">Healthcare</option>
//                 <option value="Supplements">Supplements</option>
//                 <option value="Skin Care">Skin Care</option>
//                 <option value="Natural">Natural</option>
//                 <option value="Pharma">Pharma</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="product-grid shop-grid">
//           {filteredProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onOrder={onOrder}
//             />
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="no-results">
//             <p>No products found matching your search.</p>
//           </div>
//         )}
//       </section>

//       {/* ================= DOCTOR SECTION ================= */}
//       <section className="section container doctors-section">
//         <div className="doctor-card dark">
//           <div className="doctor-info">
//             <span className="card-category">Healthcare</span>
//             <h3>Nature's Bounty</h3>
//             <p>
//               Learn special solution that's <br />
//               for best YOU and your skin here.
//             </p>
//             <button className="btn-pill btn-light-purple">
//               Book appointment <ArrowRight size={16} />
//             </button>
//           </div>
//           <div className="doctor-image">
//             <img src={dr1} alt="Nature's Bounty" />
//           </div>
//         </div>

//         <div className="doctor-card light">
//           <div className="doctor-info">
//             <h3>Dr. Shapox Smith</h3>
//             <p>
//               Learn special solution that's <br />
//               for best YOU and your skin here.
//             </p>
//             <button className="btn-pill btn-white-outline">
//               Book appointment <ArrowRight size={16} />
//             </button>
//           </div>
//           <div className="doctor-image">
//             <img src={dr2} alt="Dr. Shapox Smith" />
//           </div>
//         </div>
//       </section>

//       {/* ================= REVIEWS SECTION ================= */}
//       <section className="section container reviews-section">
//         <div className="reviews-header">
//           <div className="reviews-stats">
//             <h2>
//               4.5/5 review from <br />
//               7,000+ verified customer
//             </h2>
//           </div>

//           <p className="reviews-sub">
//             But don't just take our word for it — here's what our customers
//             have to say about our solutions.
//           </p>
//         </div>

//         <div className="reviews-grid">
//           {reviews.map((review) => (
//             <div key={review.id} className="review-card">
//               <div className="stars">
//                 {Array(5)
//                   .fill(0)
//                   .map((_, i) => (
//                     <Star
//                       key={i}
//                       size={16}
//                       fill={i < review.stars ? 'currentColor' : 'none'}
//                       color={i < review.stars ? 'currentColor' : '#ccc'}
//                     />
//                   ))}
//               </div>

//               <p className="review-text">"{review.text}"</p>
//               <p className="review-author">{review.author}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

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
