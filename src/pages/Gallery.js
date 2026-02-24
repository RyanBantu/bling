import React from 'react';
import deb1 from "../components/debbie/12.jpg";
import deb4 from "../components/debbie/4.jpg";
import deb5 from "../components/debbie/5.jpg";
import deb6 from "../components/debbie/6.jpg";
import deb7 from "../components/debbie/7.jpg";
import deb8 from "../components/debbie/8.jpg";

const Gallery = () => {
  const images = [deb1, deb4, deb5, deb6, deb7, deb8];

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Gallery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
