import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, // Speed of typing
        delayChildren: 1.2 
      }
    }
  };

  const letterVariant: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(12px) hue-rotate(90deg) brightness(1.5)", // Color shift + blur start
      scale: 1.1,
      display: "none" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px) hue-rotate(0deg) brightness(1)", // Settles to natural color
      scale: 1,
      display: "inline-block",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cursorVariant: Variants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const name = "Ishita";

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black z-0" />
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', filter: 'contrast(170%) brightness(1000%)'}} />

      <motion.div style={{ y: yText, opacity }} className="relative z-10 text-center px-4 flex flex-col items-center">
        
        {/* Decorative Top */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex items-center gap-3 text-pink-300/60 mb-8"
        >
          <Sparkles size={16} />
          <span className="uppercase tracking-[0.4em] text-xs font-medium font-inter">Jan 21 • Special Day</span>
          <Sparkles size={16} />
        </motion.div>

        {/* Static Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-3xl md:text-5xl font-playfair text-white/80 mb-6 italic"
        >
          Happy Birthday
        </motion.h2>

        {/* Typewriter Name */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center overflow-hidden p-2"
        >
          {name.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariant}
              // Enriched gradient to support the hue-rotate effect better
              className="text-6xl md:text-9xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-200 via-white to-purple-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] mx-0.5"
            >
              {letter}
            </motion.span>
          ))}
          {/* Blinking Cursor */}
          <motion.div
             variants={cursorVariant}
             animate="blinking"
             className="w-1 md:w-2 h-12 md:h-20 bg-pink-400 ml-2 shadow-[0_0_10px_#f472b6]"
          />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-inter">Scroll</span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.div>

    </section>
  );
};