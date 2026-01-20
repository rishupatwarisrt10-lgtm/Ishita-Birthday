import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { generateFinalMessage } from '../services/geminiService';

export const FinalWish: React.FC = () => {
  const [finalMessage, setFinalMessage] = useState("Wishing you a year as beautiful as your soul, Ishita.");

  useEffect(() => {
    let mounted = true;
    const fetchMessage = async () => {
      const msg = await generateFinalMessage();
      if (mounted && msg) {
        setFinalMessage(msg);
      }
    };
    fetchMessage();
    return () => { mounted = false; };
  }, []);

  return (
    <footer className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black" />
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="z-10 px-6"
      >
        <h2 className="text-6xl md:text-9xl font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 mb-8">
          Happy Birthday
        </h2>
        
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-8" />
        
        <p className="text-xl md:text-2xl font-playfair italic text-pink-200/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {finalMessage}
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300"
        >
          <span className="flex items-center gap-3 font-medium tracking-widest uppercase text-sm">
            <Heart className="text-pink-500 fill-pink-500/20 group-hover:fill-pink-500 transition-colors" size={18} />
             Sent with Love
          </span>
          <div className="absolute inset-0 rounded-full ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-500" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-8 text-xs text-gray-700 uppercase tracking-widest">
        January 21st • Celebration
      </div>
    </footer>
  );
};
