import React, { useState, useEffect } from 'react';
import deb1 from "../components/debbie/1.jpg";
import deb2 from "../components/debbie/2.jpg";
import deb3 from "../components/debbie/3.jpg";
import deb4 from "../components/debbie/4.jpg";
import deb5 from "../components/debbie/5.jpg";
import deb6 from "../components/debbie/6.jpg";
import deb7 from "../components/debbie/7.jpg";
import deb8 from "../components/debbie/8.jpg";
import deb9 from "../components/debbie/9.jpg";
import deb12 from "../components/debbie/12.jpg";
import chatgpt from "../components/debbie/ChatGPT Image Feb 25, 2026 at 11_55_23 AM.png";
import whatsapp1 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38 (1).jpeg";
import whatsapp2 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38 (2).jpeg";
import whatsapp3 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38 (3).jpeg";
import whatsapp4 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38.jpeg";
import whatsapp5 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.39 (1).jpeg";
import whatsapp6 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.39.jpeg";
import whatsapp7 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.40 (1).jpeg";
import whatsapp8 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.40.jpeg";
import whatsapp9 from "../components/debbie/WhatsApp Image 2026-02-25 at 12.11.27.jpeg";

const Gallery = () => {
  const images = [
    deb1, deb2, deb3, deb4, deb5, deb6, deb7, deb8, deb9, deb12,
    chatgpt, whatsapp1, whatsapp2, whatsapp3, whatsapp4, whatsapp5, whatsapp6, whatsapp7, whatsapp8, whatsapp9
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  // Generate random rotation for Polaroid effect
  const getRotation = (index) => {
    const rotations = [-2, -1, 0, 1, 2, -1.5, 1.5, -0.5, 0.5, -2.5, 2.5, -1.2, 1.2, -0.8, 0.8, -1.8, 1.8, -0.3, 0.3, -1.7];
    return rotations[index % rotations.length];
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Navigate between images with arrow keys
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (selectedImage === null) return;

      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    document.addEventListener('keydown', handleArrowKeys);
    return () => document.removeEventListener('keydown', handleArrowKeys);
  }, [selectedImage, images.length]);

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Gallery
        </h1>
        
        {/* Desktop: Square grid layout with yellow post-it style */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-5 grid-rows-4 gap-4">
              {images.map((img, index) => {
                const rotation = getRotation(index);
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={() => openModal(index)}
                  >
                    <div className="bg-yellow-200 rounded-sm shadow-lg p-2 pb-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-yellow-300">
                      <div className="aspect-square overflow-hidden rounded-sm">
                        <img
                          src={img}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Post-it bottom border for writing */}
                      <div className="h-6 mt-2 bg-yellow-200"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Scrollable horizontal layout with yellow post-it style */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {images.map((img, index) => {
              const rotation = getRotation(index);
              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 group"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  onClick={() => openModal(index)}
                >
                  <div className="bg-yellow-200 rounded-sm shadow-lg p-2 pb-8 w-64 hover:shadow-2xl transition-all duration-300 border border-yellow-300">
                    <div className="aspect-square overflow-hidden rounded-sm">
                      <img
                        src={img}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Post-it bottom border for writing */}
                    <div className="h-6 mt-2 bg-yellow-200"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage]}
              alt={`Memory ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain animate-zoomIn"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
