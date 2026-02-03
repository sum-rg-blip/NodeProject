// src/components/DashboardContent.jsx
import React, { useState } from "react";
import { HiBookOpen, HiDownload, HiStar, HiX } from "react-icons/hi";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import CustomerList from "../pages/Customers";

export default function DashboardContent({ activeSection }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const books = [
    {
      id: 1,
      title: "Goodman & Gilman's Pharmacological Basis",
      author: "Laurence Brunton",
      status: "Available",
      rating: 4.8,
      pdf: "/books/AI_research.pdf",
      canRead: true,
      canDownload: true,
      tags: ["Pharmacology", "Medicine"],
    },
    {
      id: 2,
      title: "Harper's Illustrated Biochemistry",
      author: "Victor Rodwell",
      status: "Borrowed",
      rating: 4.7,
      pdf: "/books/walker-master.pdf",
      canRead: true,
      canDownload: false,
      tags: ["Biochemistry", "Science"],
    },
    {
      id: 3,
      title: "Gray's Anatomy for Students",
      author: "Richard Drake",
      status: "Available",
      rating: 4.9,
      pdf: "/books/Guyton_and_Hall Physiology.pdf",
      canRead: true,
      canDownload: true,
      tags: ["Anatomy", "Medicine"],
    },
    {
      id: 4,
      title: "Introduction to Algorithms",
      author: "Cormen et al.",
      status: "Available",
      rating: 4.6,
      pdf: "/books/Introduction_to_Algorithms.pdf",
      canRead: true,
      canDownload: true,
      tags: ["Algorithms", "Computer Science"],
    },
    {
      id: 5,
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      status: "Borrowed",
      rating: 4.8,
      pdf: "/books/ai_modern.pdf",
      canRead: true,
      canDownload: true,
      tags: ["AI", "Computer Science"],
    },
    {
      id: 6,
      title: "Deep Learning",
      author: "Ian Goodfellow",
      status: "Available",
      rating: 4.7,
      pdf: "/books/deep_learning.pdf",
      canRead: true,
      canDownload: true,
      tags: ["AI", "Machine Learning"],
    },
  ];

  const filteredBooks = books.filter((b) =>
    activeTag
      ? b.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      : b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMore = () => setVisibleCount((prev) => prev + 3);

  const tagsList = ["Pharmacology", "Medicine", "Science", "Anatomy", "AI"];

  return (
    <>
      {activeSection === "dashboard" && (
        <div className=" p-6 rounded-2xl">
          <h1 className="text-2xl font-semibold text-slate-950 mb-4">
            Digital Library
          </h1>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-indigo-700/20 p-4 rounded-xl text-white">
              <p className="text-sm">Total Books</p>
              <p className="text-2xl font-bold">{books.length}</p>
            </div>
            <div className="bg-green-700/20 p-4 rounded-xl text-white">
              <p className="text-sm">Available Books</p>
              <p className="text-2xl font-bold">
                {books.filter((b) => b.status === "Available").length}
              </p>
            </div>
            <div className="bg-red-700/20 p-4 rounded-xl text-white">
              <p className="text-sm">Borrowed Books</p>
              <p className="text-2xl font-bold">
                {books.filter((b) => b.status === "Borrowed").length}
              </p>
            </div>
            <div className="bg-yellow-700/20 p-4 rounded-xl text-white">
              <p className="text-sm">Total Customers</p>
              <p className="text-2xl font-bold">125</p>
            </div>
          </div>

          {/* Search & Tags */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search books..."
              className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTag(""); 
              }}
            />

            {/* Tags Buttons */}
            <div className="flex flex-wrap gap-2 mb-2">
              {tagsList.map((tag) => {
                const count = books.filter((b) =>
                  b.tags.includes(tag)
                ).length;

                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-2 py-1 rounded-full text-xs transition ${
                      activeTag === tag
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-600/30 text-white hover:bg-indigo-500"
                    }`}
                  >
                    {tag} ({count})
                  </button>
                );
              })}

              {activeTag && (
                <button
                  onClick={() => setActiveTag("")}
                  className="px-2 py-1 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* BOOK CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.slice(0, visibleCount).map((book) => (
              <div
                key={book.id}
                className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-5 shadow-lg shadow-indigo-500/5 hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-36 rounded-xl mb-4 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-medium text-center px-3">
                  {book.title}
                </div>

                <p className="text-sm text-slate-400 mb-2">
                  by <span className="text-slate-200">{book.author}</span>
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full border ${
                      book.status === "Available"
                        ? "bg-green-500/20 text-green-300 border-green-400/20"
                        : "bg-red-500/20 text-red-300 border-red-400/20"
                    }`}
                  >
                    {book.status}
                  </span>

                  <div className="flex items-center gap-1 text-indigo-300 ml-auto">
                    {Array.from({ length: Math.floor(book.rating) }).map(
                      (_, i) => <HiStar key={i} className="text-yellow-400" />
                    )}
                    {book.rating % 1 !== 0 && (
                      <HiStar className="text-yellow-200" />
                    )}
                    <span className="text-sm ml-1">{book.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {book.canRead && (
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setScale(1.0);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition relative group"
                    >
                      <HiBookOpen /> Read
                    </button>
                  )}

                  {book.canDownload && (
                    <a
                      href={book.pdf}
                      download
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm border border-indigo-500/20 transition relative group"
                    >
                      <HiDownload /> Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredBooks.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition"
              >
                Load More
              </button>
            </div>
          )}

          {/* Most Popular Books */}
         
        </div>
      )}

      {/* OTHER SECTIONS */}
      {activeSection === "customer" && <CustomerList />}
      {activeSection === "message" && <h1 className="text-white">Message</h1>}
      {activeSection === "logout" && <h1 className="text-white">Logout</h1>}

      {/* PDF MODAL */}
      {selectedBook && (
        <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl p-5 relative border border-indigo-500/20 flex flex-col">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 bg-indigo-500/20 hover:bg-indigo-500/30 p-2 rounded-full text-indigo-300"
            >
              <HiX />
            </button>
            <h2 className="text-lg font-medium text-white mb-4">
              {selectedBook.title}
            </h2>
            <div className="flex-1 overflow-auto scroll-smooth border border-indigo-500/20 rounded">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={selectedBook.pdf} defaultScale={scale} />
              </Worker>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}