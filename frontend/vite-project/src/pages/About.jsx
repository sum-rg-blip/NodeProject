import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  // Navigate to the Products page
  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 px-6 md:px-12 overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              About <span className="text-yellow-300">Store Pharmacy</span>
            </h1>
            <p className="text-lg md:text-xl max-w-md">
              Providing trusted healthcare products, supplements, and wellness solutions for over 20 years. Your health is our priority.
            </p>
            <button
              onClick={handleShopNow}
              className="bg-yellow-300 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Shop Now
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/050/817/819/small/happy-smiling-male-doctor-with-hand-present-something-empty-space-standing-isolate-on-transparent-background-png.png"
              alt="Doctor"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-yellow-300 rounded-full opacity-20"></div>
      </section>

      {/* Our Mission */}
      <section className="relative bg-white -mt-20 z-10 shadow-lg rounded-3xl max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Store Pharmacy is dedicated to providing safe, clinically tested, and high-quality healthcare solutions. We aim to empower people to live healthier lives with easy access to trusted wellness products.
        </p>
      </section>

      {/* Features / Values */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3143/3143463.png"
            alt="Quality Products"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
          <p className="text-gray-500 text-sm">
            Only clinically-tested, high-quality supplements and healthcare products.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2910/2910763.png"
            alt="Expert Advice"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
          <p className="text-gray-500 text-sm">
            Knowledgeable pharmacists ready to guide and personalize your care.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209272.png"
            alt="Fast Delivery"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">
            Quick and reliable shipping directly to your door for all orders.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">Meet Our Team</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our experienced pharmacists and wellness experts are here to provide guidance, personalized care, and the highest level of professionalism to every customer.
          </p>
          <ul className="text-gray-500 list-disc list-inside space-y-2">
            <li>Certified Pharmacists</li>
            <li>Customer-first Approach</li>
            <li>Trusted Health Experts</li>
          </ul>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://d2908q01vomqb2.cloudfront.net/9e6a55b6b4563e652a23be9d623ca5055c356940/2021/02/17/hospital-staffing.jpg"
            alt="Team"
            className="rounded-2xl shadow-2xl object-cover h-96 w-full"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16 px-6 md:px-12 text-center rounded-2xl max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Ready to Shop Healthy?</h2>
        <p className="text-lg mb-6 text-indigo-100">
          Explore our range of trusted healthcare products and wellness solutions today.
        </p>
        <button
          onClick={handleShopNow}
          className="bg-yellow-300 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition"
        >
          Shop Now
        </button>
      </section>

    </div>
  );
}

export default About;
