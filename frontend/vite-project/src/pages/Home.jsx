import React from "react";
import { useNavigate } from "react-router-dom";
import {
  categories as homeCategories,
  allProducts as homeProducts,
  seasonalSolutions as homeSolutions,
} from "../data/mockData";

function Home() {
  const navigate = useNavigate();
  const featuredProducts = homeProducts.slice(0, 4);

  return (
    <div className="py-8 px-4 md:px-12 space-y-16">

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl p-10 shadow-xl">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-300"> StorePharmacy</span>
          </h1>
          <p className="text-lg max-w-md">
            Discover health essentials, trusted supplements, and personalized care — all in one place.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-300 text-black font-bold px-7 py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            Shop Now
          </button>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/050/817/819/small/happy-smiling-male-doctor-with-hand-present-something-empty-space-standing-isolate-on-transparent-background-png.png"
            alt=""
            className="object-cover h-96"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Our Popular Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {homeCategories.map((cat) => (
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

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Today’s Best Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <p className="font-semibold text-lg">{product.brand}</p>
                  <p className="text-gray-500 mb-4">{product.price}</p>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Solutions */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-semibold mb-12">
          Our Seasonal <br /> Exclusive Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeSolutions.map((solution) => (
            <div
              key={solution.id}
              className="relative bg-pink-50 rounded-3xl p-8 min-h-[220px] overflow-hidden"
            >
              <h3 className="text-sm font-semibold mb-6">
                {solution.title}
              </h3>

              <button className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full text-sm font-medium border hover:bg-gray-100 transition">
                See more <span className="text-gray-500">→</span>
              </button>

              <img
                src={solution.image}
                alt={solution.title}
                className="absolute bottom-0 right-0 w-1/3 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
