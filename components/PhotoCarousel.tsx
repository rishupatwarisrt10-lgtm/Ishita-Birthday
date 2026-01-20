import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Aperture, Minus } from 'lucide-react';

// ==========================================
// HOW TO ADD YOUR OWN PHOTOS:
// 1. Create a folder named 'public' in your project root (if it doesn't exist).
// 2. Inside 'public', create a folder named 'images'.
// 3. Drag and drop your photos there.
// 4. Update the 'url' fields below. 
//    Example: url: "/images/my-photo.jpg"
// ==========================================

const images = [
  {
    id: 1,
    // REPLACE WITH YOUR IMAGE URL or PATH (e.g. "/images/photo1.jpg")
    url: "/images/ishita-1.jpg",
    title: "Radiance",
    subtitle: "A smile that lights up the darkest rooms."
  },
  {
    id: 2,
    // REPLACE WITH YOUR IMAGE URL
    url: "/images/ishita-2.jpg",
    title: "Grace",
    subtitle: "Effortless elegance in every motion."
  },
  {
    id: 3,
    // REPLACE WITH YOUR IMAGE URL
    url: "/images/ishita-3.jpg",
    title: "Joy",
    subtitle: "Pure, unfiltered happiness."
  },
  {
    id: 4,
    // REPLACE WITH YOUR IMAGE URL
    url: "/images/ishita-4.jpg",
    title: "Allure",
    subtitle: "Eyes that hold a thousand stories."
  },
  {
    id: 5,
    // REPLACE WITH YOUR IMAGE URL
    url: "/images/ishita-5.jpg",
    title: "Spirit",
    subtitle: "Wild, free, and beautiful."
  }
];

export const PhotoCarousel: React.FC = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance for a cinematic feel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [page]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => (prev + newDirection + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.2,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    })
  };

  const currentImage = images[page];

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
        
        {/* --- Background Layer: Dynamic Atmosphere --- */}
        <AnimatePresence mode="popLayout">
            <motion.div
                key={currentImage.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
            >
                <img 
                    src={currentImage.url} 
                    className="w-full h-full object-cover blur-[80px] scale-110" 
                    alt="Atmosphere"
                />
            </motion.div>
        </AnimatePresence>
        
        {/* Film Grain Texture */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-overlay" 
             style={{backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', filter: 'contrast(150%) brightness(100%)'}} />
        
        {/* Dark Vignette */}
        <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-black/90 pointer-events-none" />

        {/* --- Content Layer --- */}
        <div className="relative z-10 w-full max-w-[90vw] md:max-w-7xl h-[70vh] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Text & Counter (Desktop) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-between h-full py-12 order-2 md:order-1 relative">
                 {/* Giant Background Number for Depth */}
                 <div className="absolute top-1/2 -translate-y-1/2 -left-20 text-[20rem] font-bold font-inter text-white/5 select-none pointer-events-none z-0">
                    0{page + 1}
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-3 text-pink-400 mb-6">
                        <Aperture className="animate-spin-slow" size={20} />
                        <span className="uppercase tracking-[0.2em] text-xs font-semibold">Gallery</span>
                    </div>
                    
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.h2 
                                key={currentImage.title}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className="text-6xl font-cinzel text-white mb-4"
                            >
                                {currentImage.title}
                            </motion.h2>
                        </AnimatePresence>
                    </div>

                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p 
                                key={currentImage.subtitle}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                className="text-white/60 font-playfair italic text-xl border-l-2 border-pink-500/50 pl-4"
                            >
                                {currentImage.subtitle}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                 </div>

                 {/* Navigation Buttons */}
                 <div className="flex gap-4 relative z-10 mt-auto">
                    <button 
                        onClick={() => paginate(-1)}
                        className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <ChevronLeft size={24} className="group-active:-translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => paginate(1)}
                        className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <ChevronRight size={24} className="group-active:translate-x-1 transition-transform" />
                    </button>
                 </div>
            </div>

            {/* Right Side: Main Image Stage */}
            <div className="md:col-span-9 h-full relative order-1 md:order-2 flex items-center">
                {/* Mobile Text Overlay (Visible only on mobile) */}
                <div className="md:hidden absolute top-4 left-4 z-20 text-left drop-shadow-lg">
                     <h2 className="text-4xl font-cinzel text-white">{currentImage.title}</h2>
                     <p className="text-white/80 font-playfair text-sm">{currentImage.subtitle}</p>
                </div>

                <div className="relative w-full h-full md:h-[90%] overflow-hidden rounded-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-black/50 border border-white/10 group">
                    <div className="absolute inset-0 z-10 border border-white/10 pointer-events-none" />
                    
                    {/* Animated Image */}
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.5 },
                                scale: { duration: 0.5 },
                                filter: { duration: 0.4 }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                             {/* Ken Burns Effect Inner Container */}
                             <motion.div 
                                className="w-full h-full"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.1 }}
                                transition={{ duration: 10, ease: "linear" }}
                             >
                                <img 
                                    src={currentImage.url} 
                                    alt={currentImage.title}
                                    className="w-full h-full object-cover"
                                />
                             </motion.div>
                             
                             {/* Cinematic Gradient Overlay */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Bar (Bottom Edge) */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full z-20">
                        <motion.div 
                            key={page}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="h-full bg-pink-500 shadow-[0_0_10px_#ec4899]" 
                        />
                    </div>
                </div>

                {/* Mobile Navigation (Floating) */}
                <div className="md:hidden absolute bottom-4 right-4 z-30 flex gap-2">
                    <button onClick={() => paginate(-1)} className="p-3 bg-black/50 backdrop-blur text-white rounded-full border border-white/10"><ChevronLeft size={20}/></button>
                    <button onClick={() => paginate(1)} className="p-3 bg-black/50 backdrop-blur text-white rounded-full border border-white/10"><ChevronRight size={20}/></button>
                </div>
            </div>
        </div>

        {/* Film Strip Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-1">
            {images.map((_, i) => (
                <button
                    key={i}
                    onClick={() => {
                        setDirection(i > page ? 1 : -1);
                        setPage(i);
                    }}
                    className={`h-1 transition-all duration-300 ${i === page ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/60'}`}
                />
            ))}
        </div>

    </section>
  );
};