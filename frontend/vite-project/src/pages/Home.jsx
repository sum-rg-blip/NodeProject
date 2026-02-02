import React from "react";

const categories = [
  { title: "Kidney Care", img: "https://via.placeholder.com/80" },
  { title: "Kidney Care", img: "https://via.placeholder.com/80" },
  { title: "Liver Care", img: "https://via.placeholder.com/80" },
  { title: "Phytology Care", img: "https://via.placeholder.com/80" },
  { title: "Sleek Care", img: "https://via.placeholder.com/80" },
  { title: "Pregnant Care", img: "https://via.placeholder.com/80" },
];

const products = [
  { name: "Fish Oil", price: "$56.00", img: "https://via.placeholder.com/120" },
  { name: "Vitamin C", price: "$56.00", img: "https://via.placeholder.com/120" },
  { name: "Herbal Mix", price: "$56.00", img: "https://via.placeholder.com/120" },
  { name: "Health Plus", price: "$56.00", img: "https://via.placeholder.com/120" },
  { name: "Daily Care", price: "$56.00", img: "https://via.placeholder.com/120" },
];

function Home() {
  return (
    <div className="py-6">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient p-6 rounded-lg">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-3">
            Pharmacy<span className="text-primary">*</span>
          </h1>
          <p className="text-gray-600 mb-4">
            Optimized dashboards, happier billing process, and managed solutions.
          </p>
          <button className="btn btn-primary">Shop Now</button>

          <div className="mt-4 p-4 bg-white rounded shadow w-40">
            <p className="text-sm text-gray-500">Insights</p>
            <p className="text-2xl font-bold">98.5%</p>
            <p className="text-xs text-gray-400">Brian, 30 y/o (Male)</p>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="https://via.placeholder.com/300x300"
            alt="Doctor"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Our Popular Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="card w-40 text-center p-4 cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="mx-auto mb-2 rounded"
              />
              <p className="font-medium">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Offers */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Today's Best Offer Just For You
          </h2>
          <button className="btn btn-link">See more →</button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {products.map((item, i) => (
            <div key={i} className="card w-44 p-4 text-center">
              <img
                src={item.img}
                alt={item.name}
                className="mx-auto mb-3"
              />
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 mb-2">{item.price}</p>
              <button className="btn btn-outline btn-sm">
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;