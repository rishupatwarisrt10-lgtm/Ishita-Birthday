import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cards = [
  {
    id: 1,
    title: "Elegance",
    desc: "A grace that captures every room you enter.",
    img: "/images/ishita-1.jpg"
  },
  {
    id: 2,
    title: "Kindness",
    desc: "A heart that radiates warmth like the winter sun.",
    img: "/images/ishita-2.jpg"
  },
  {
    id: 3,
    title: "Mystery",
    desc: "Depths of character that intrigue and inspire.",
    img: "/images/ishita-3.jpg"
  },
  {
    id: 4,
    title: "Focus",
    desc: "The determination to achieve whatever you set your mind to.",
    img: "/images/ishita-4.jpg"
  }
];

export const HorizontalGallery: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (import.meta.env.DEV) {
      console.warn(`Could not load image: ${e.currentTarget.src}`);
    }
    // Fallback to a gradient if external image also fails
    e.currentTarget.src = "/images/ishita-5.jpg";
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-24 pr-24">
          
          {/* Intro Card for the slider */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-[50vw] md:w-[30vw] shrink-0 flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-playfair text-white mb-6">
              Moments of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Magic
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Swipe through the essence of you.</p>
          </motion.div>

          {cards.map((card, index) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative h-[60vh] w-[80vw] md:w-[25vw] shrink-0 overflow-hidden rounded-3xl glass-card group perspective-1000"
            >
              <img 
                src={card.img} 
                alt={card.title}
                onError={handleImageError}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-cinzel text-white mb-2">{card.title}</h3>
                <p className="text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};