import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Star, Quote } from 'lucide-react';

export const GeminiWish: React.FC = () => {
  const poemLines = [
    "Stand—",
    "unescorted.",
    "Joy withdraws.",
    "Chambers—",
    "hold.",
    "Small heart—",
    "speaks.",
    "Weight.",
    "Longings—ungranted.",
    "Strength becomes ritual.",
    "Vexation learns its bounds.",
    "A smile—",
    "worn.",
    "Precise—practiced.",
    "Anguish—sealed",
    "behind a crown.",
    "Retained.",
    "Fate should attend.",
    "What endures",
    "ascends the crown."
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-pink-400/80 mb-4">
            <Feather size={18} />
            <span className="uppercase tracking-[0.3em] text-xs font-medium">Original Verse</span>
            <Feather size={18} className="scale-x-[-1]" />
          </div>
        </motion.div>

        <div className="relative glass-card px-8 py-16 md:px-24 md:py-20 rounded-[2px] md:rounded-[4rem] border-y border-white/10 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] max-w-2xl w-full text-center">
          
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 text-white/5">
            <Quote size={40} className="rotate-180" />
          </div>
          <div className="absolute bottom-8 right-8 text-white/5">
             <Quote size={40} />
          </div>

          <div className="flex flex-col gap-3 md:gap-4 relative z-10">
            {poemLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1, // Stagger effect
                  ease: "easeOut" 
                }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className={`
                  font-playfair text-xl md:text-2xl text-gray-200 tracking-wide leading-relaxed
                  ${line.includes("crown") ? 'text-pink-100 drop-shadow-[0_0_8px_rgba(255,192,203,0.3)]' : ''}
                `}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16 flex justify-end px-4"
          >
            <div className="relative">
                <p className="font-cinzel text-lg md:text-xl text-pink-300/80 italic relative z-10">
                — some creature ( Ishita )
                </p>
                <div className="absolute -bottom-2 right-0 w-full h-px bg-gradient-to-l from-pink-500/50 to-transparent" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};