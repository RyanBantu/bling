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
import deb13 from "../components/debbie/13.jpg";
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
    deb1, deb2, deb3, deb4, deb5, deb6, deb7, deb8, deb9, deb12, deb13,
    chatgpt, whatsapp1, whatsapp2, whatsapp3, whatsapp4, whatsapp5, whatsapp6, whatsapp7, whatsapp8
  ];

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Gallery
        </h1>
        
        {/* Desktop: Square grid layout - 5 columns x 4 rows = 20 images */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-5xl aspect-square">
            <div className="grid grid-cols-5 grid-rows-4 gap-2 h-full w-full">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer flex items-center justify-center p-1"
                >
                  <img
                    src={img}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Scrollable horizontal layout */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-64 h-64 flex items-center justify-center p-2"
              >
                <img
                  src={img}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
