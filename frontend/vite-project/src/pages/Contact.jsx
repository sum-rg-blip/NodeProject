import React from "react";

export default function Contact() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 text-center bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Contact Us
      </h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-6">
        For inquiries, please email us at{" "}
        <a
          href="mailto:info@pharmacy.com"
          className="text-blue-600 hover:underline"
        >
          info@pharmacy.com
        </a>{" "}
        or call{" "}
        <a href="tel:+1234567890" className="text-blue-600 hover:underline">
          (123) 456-7890
        </a>
        . We look forward to assisting you with your healthcare needs.
      </p>

      <div className="flex gap-4">
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
