import React, { useState } from 'react';
import { Music, X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundAudioProps {
  isPlaying: boolean;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ isPlaying }) => {
  // Default to true so the player is visible immediately when music starts
  const [isOpen, setIsOpen] = useState(true);

  // Default Song: Golden Hour (Piano Version) - Fits the cinematic/magical theme
  // You can replace this ID with any Spotify Track ID
  const trackId = "4rbO0584CDEcZFYxZs5pZp"; 

  if (!isPlaying) return null;

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass-card rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 w-[300px] sm:w-[350px]"
            >
              <div className="bg-black/40 backdrop-blur-md p-1 flex justify-between items-center px-4 py-2 border-b border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-inter">Now Playing</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Minimize2 size={14} />
                </button>
              </div>
              <iframe 
                style={{ borderRadius: "0 0 12px 12px" }} 
                // Added &autoplay=1 to force playback start
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`} 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Player"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full glass-card hover:bg-white/10 transition-all duration-300 border border-white/20 shadow-[0_0_20px_rgba(255,105,180,0.3)]"
        >
          {!isOpen && (
             <span className="absolute inset-0 rounded-full border border-green-500/30 animate-ping opacity-75" />
          )}
          
          <div className="relative z-10 text-pink-300 group-hover:text-white transition-colors">
             {isOpen ? <X size={20} /> : <Music size={20} />}
          </div>
          
          <div className="absolute right-full mr-4 px-3 py-1 glass-card rounded-lg text-xs font-inter text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {isOpen ? "Close Player" : "Play Music"}
          </div>
        </motion.button>
      </div>
    </>
  );
};