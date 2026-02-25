import React from 'react';
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

const Gallery = () => {
  const images = [
    deb1, deb2, deb3, deb4, deb5, deb6, deb7, deb8, deb9, deb12,
    chatgpt, whatsapp1, whatsapp2, whatsapp3, whatsapp4, whatsapp5, whatsapp6, whatsapp7, whatsapp8
  ];

  // Generate random rotation for Polaroid effect
  const getRotation = (index) => {
    const rotations = [-2, -1, 0, 1, 2, -1.5, 1.5, -0.5, 0.5, -2.5, 2.5, -1.2, 1.2, -0.8, 0.8, -1.8, 1.8, -0.3, 0.3];
    return rotations[index % rotations.length];
  };

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Gallery
        </h1>
        
        {/* Desktop: Square grid layout with Polaroid style */}
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
                  >
                    <div className="bg-white rounded-sm shadow-lg p-2 pb-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="aspect-square overflow-hidden rounded-sm">
                        <img
                          src={img}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Polaroid bottom border for writing */}
                      <div className="h-6 mt-2 bg-white"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Scrollable horizontal layout with Polaroid style */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {images.map((img, index) => {
              const rotation = getRotation(index);
              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 group"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="bg-white rounded-sm shadow-lg p-2 pb-8 w-64 hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden rounded-sm">
                      <img
                        src={img}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Polaroid bottom border for writing */}
                    <div className="h-6 mt-2 bg-white"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
