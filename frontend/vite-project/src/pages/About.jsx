import React from "react";

export default function About() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 bg-gray-50 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        About Us
      </h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-6">
        At PHARMACY, we provide trusted healthcare products to ensure the
        well-being of our customers. Our mission is to deliver quality,
        reliability, and convenience in healthcare.
      </p>

      <div className="flex gap-4">
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </a>
        <a
          href="/contact"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
