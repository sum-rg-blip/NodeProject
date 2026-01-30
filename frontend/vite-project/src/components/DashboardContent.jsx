// src/components/DashboardContent.jsx
import React, { useState } from "react";
import { HiBookOpen, HiDownload, HiStar, HiX } from "react-icons/hi";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import CustomerList from "../pages/Customers";

export default function DashboardContent({ activeSection }) {
  const [selectedBook, setSelectedBook] = useState(null);

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
    },
  ];

  return (
    <>
      {/* DASHBOARD */}
      {activeSection === "dashboard" && (
        <div className="bg-slate-950 p-6 rounded-2xl">
          <h1 className="text-2xl font-semibold text-white mb-6">
            Digital Library
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="
                  bg-slate-900
                  border border-indigo-500/20
                  rounded-2xl p-5
                  shadow-lg shadow-indigo-500/5
                  hover:-translate-y-1
                  hover:border-indigo-500/40
                  transition-all duration-300
                "
              >
                {/* COVER */}
                <div
                  className="
                    h-36 rounded-xl mb-4
                    bg-gradient-to-br from-indigo-500 to-indigo-600
                    flex items-center justify-center
                    text-white font-medium text-center px-3
                  "
                >
                  {book.title}
                </div>

                {/* AUTHOR */}
                <p className="text-sm text-slate-400 mb-2">
                  by <span className="text-slate-200">{book.author}</span>
                </p>

                {/* STATUS + RATING */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="
                      px-3 py-1 text-xs rounded-full
                      bg-indigo-400/20
                      text-indigo-300
                      border border-indigo-500/20
                    "
                  >
                    {book.status}
                  </span>

                  <div className="flex items-center gap-1 text-indigo-300 ml-auto">
                    <HiStar />
                    <span className="text-sm">{book.rating}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  {book.canRead && (
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="
                        flex-1 flex items-center justify-center gap-2
                        py-2 rounded-xl
                        bg-indigo-600 hover:bg-indigo-500
                        text-white text-sm
                        transition
                      "
                    >
                      <HiBookOpen /> Read
                    </button>
                  )}

                  {book.canDownload && (
                    <a
                      href={book.pdf}
                      download
                      className="
                        flex-1 flex items-center justify-center gap-2
                        py-2 rounded-xl
                        bg-indigo-500/20 hover:bg-indigo-500/30
                        text-indigo-300 text-sm
                        border border-indigo-500/20
                        transition
                      "
                    >
                      <HiDownload /> Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OTHER SECTIONS */}
      {activeSection === "customer" && <CustomerList />}
      {activeSection === "message" && <h1 className="text-white">Message</h1>}
      {activeSection === "logout" && <h1 className="text-white">Logout</h1>}

      {/* PDF MODAL */}
      {selectedBook && (
        <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl p-5 relative border border-indigo-500/20">
            <button
              onClick={() => setSelectedBook(null)}
              className="
                absolute top-4 right-4
                bg-indigo-500/20 hover:bg-indigo-500/30
                p-2 rounded-full text-indigo-300
              "
            >
              <HiX />
            </button>

            <h2 className="text-lg font-medium text-white mb-4">
              {selectedBook.title}
            </h2>

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
              <Viewer fileUrl={selectedBook.pdf} />
            </Worker>
          </div>
        </div>
      )}
    </>
  );
}
