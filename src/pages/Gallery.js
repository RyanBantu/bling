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
import whatsapp1 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38 (1).jpeg";
import whatsapp2 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38 (2).jpeg";
import whatsapp3 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38 (3).jpeg";
import whatsapp4 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.38.jpeg";
import whatsapp5 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.39 (1).jpeg";
import whatsapp6 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.39 (2).jpeg";
import whatsapp7 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.39.jpeg";
import whatsapp8 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.40 (1).jpeg";
import whatsapp9 from "../components/debbie/WhatsApp Image 2026-02-25 at 10.44.40.jpeg";

const Gallery = () => {
  const images = [
    deb1, deb2, deb3, deb4, deb5, deb6, deb7, deb8, deb9, deb12, deb13,
    whatsapp1, whatsapp2, whatsapp3, whatsapp4, whatsapp5, whatsapp6, whatsapp7, whatsapp8, whatsapp9
  ];

  // Define collage layout with varying sizes
  const collageLayout = [
    { span: 'col-span-2 row-span-2' }, // Large
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-1 row-span-2' }, // Tall
    { span: 'col-span-2 row-span-1' }, // Wide
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-2 row-span-2' }, // Large
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-1 row-span-2' }, // Tall
    { span: 'col-span-2 row-span-1' }, // Wide
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-2 row-span-2' }, // Large
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-1 row-span-2' }, // Tall
    { span: 'col-span-2 row-span-1' }, // Wide
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-1 row-span-1' }, // Small
    { span: 'col-span-2 row-span-1' }, // Wide
    { span: 'col-span-1 row-span-1' }, // Small
  ];

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Gallery
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px] gap-4">
          {images.map((img, index) => {
            const layout = collageLayout[index % collageLayout.length];
            return (
              <div
                key={index}
                className={`${layout.span} bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer`}
              >
                <img
                  src={img}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
