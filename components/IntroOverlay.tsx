import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface IntroOverlayProps {
  onOpen: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onOpen }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, delay: 1 } }} // Fade out container after panels move
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top Panel */}
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} // Custom ease for smooth curtain effect
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-b border-white/10 z-20"
      />

      {/* Bottom Panel */}
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-t border-white/10 z-20"
      />

      {/* Button Container (Fades out quickly on click) */}
      <motion.div 
        className="relative z-30"
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
      >
        <button 
          onClick={onOpen}
          className="group relative px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="flex flex-col items-center gap-3">
             <div className="p-3 bg-white/5 rounded-full ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
                <Mail className="text-pink-300" size={24} />
             </div>
             <span className="font-cinzel text-xl text-white tracking-[0.2em] uppercase group-hover:tracking-[0.3em] transition-all duration-500">
               Open Invitation
             </span>
             <span className="text-[10px] text-gray-400 font-inter tracking-widest uppercase">
               For Ishita
             </span>
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
};