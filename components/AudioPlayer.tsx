import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';

interface AudioPlayerProps {
  shouldAutoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ shouldAutoPlay = false }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (shouldAutoPlay && audioRef.current) {
      // When invitation is opened, start playing immediately
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPopup(true);
      }).catch((err: unknown) => {
        if (import.meta.env.DEV) {
          console.log("Autoplay failed:", err);
        }
      });
    }
  }, [shouldAutoPlay]);

  const handleClose = () => {
    setShowPopup(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/audio.mp3.mp3" 
        loop
        muted={isMuted}
      />
      
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4 min-w-max">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Volume2 size={24} className="text-pink-400 animate-pulse" />
                    <div className="absolute inset-0 bg-pink-400/20 rounded-full animate-ping" />
                  </div>
                  
                  <div>
                    <p className="text-sm font-inter text-white/90 font-medium">
                      🎵 Playing Ishita's Favorite Song
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">Enjoy the music</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={toggleMute}
                    className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music control button */}
      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={togglePlayPause}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-pink-500/50"
          title={isPlaying ? "Pause" : "Play"}
        >
          <Volume2 size={24} className="text-white" />
        </motion.button>
      )}
    </>
  );
};
