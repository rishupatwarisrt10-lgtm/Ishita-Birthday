import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX, X, Maximize2 } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  
  // New state to track if we have shrunk to corner
  const [isCornerMode, setIsCornerMode] = useState(false);

  // Track scroll progress of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // --- ANIMATION MAPPING ---
  
  // 1. Visibility: Fade in on entry.
  // Crucial Change: We do NOT fade out at '1'. We keep opacity at 1 so it persists.
  // We only fade out if the user scrolls back UP above the section start.
  const opacity = useTransform(scrollYProgress, 
    [0, 0.1], 
    [0, 1]
  );

  // 2. Scale: Full screen (1) -> Card (0.25)
  // Happens between 30% and 70% of the section scroll
  const scale = useTransform(scrollYProgress,
    [0.3, 0.7],
    [1, 0.3]
  );

  // 3. Position: Center -> Bottom Right
  // We use percentages relative to the viewport
  const x = useTransform(scrollYProgress,
    [0.3, 0.7],
    ["0%", "30%"] 
  );
  
  const y = useTransform(scrollYProgress,
    [0.3, 0.7],
    ["0%", "30%"]
  );

  // 4. Border Radius: 0 -> 24px (Card look)
  const borderRadius = useTransform(scrollYProgress,
    [0.4, 0.6],
    ["0px", "24px"]
  );

  // 5. Border Width: 0 -> 1px (Card definition)
  const borderWidth = useTransform(scrollYProgress,
    [0.5, 0.7],
    ["0px", "1px"]
  );

  // 6. Text Opacity: Fades out quickly as we shrink
  const textOpacity = useTransform(scrollYProgress,
    [0.2, 0.35],
    [1, 0]
  );

  // Smooth springs for fluid movement
  const springConfig = { stiffness: 120, damping: 20 };
  const smoothScale = useSpring(scale, springConfig);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Manage visibility state
      if (latest > 0.05) {
        setIsVisible(true);
        if (videoRef.current && videoRef.current.paused) {
             videoRef.current.play().catch(() => {});
        }
      } else {
        setIsVisible(false);
      }

      // Track corner mode for UI updates
      setIsCornerMode(latest > 0.6);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (isClosed) return null;

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full pointer-events-none">
      
      {/* 
        Fixed Video Container
        - position: fixed to stay on screen
        - pointer-events-auto when visible so we can click buttons
      */}
      <motion.div 
        style={{ opacity }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div
            style={{ 
              scale: smoothScale,
              x: smoothX,
              y: smoothY,
              borderRadius,
              borderWidth,
              borderColor: "rgba(255,255,255,0.2)"
            }}
            className="relative w-full h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-bottom-right bg-black"
        >
            {/* The Video Source */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=1920" 
            >
                <source src="https://videos.pexels.com/video-files/5527786/5527786-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Card Controls (Visible always, but positioned for corner mode) */}
            <motion.div 
                className="absolute bottom-6 right-6 flex gap-3 z-50"
                // Scale buttons up slightly when in card mode for better touch targets
                animate={{ scale: isCornerMode ? 1.2 : 1 }} 
            >
                 <button
                    onClick={toggleMute}
                    className="p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
                 >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                 </button>
                 
                 {/* Close button - always available to dismiss the persistent video */}
                 <button
                    onClick={() => setIsClosed(true)}
                    className="p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-red-500/50 transition-all hover:scale-110 active:scale-95"
                 >
                    <X size={20} />
                 </button>
            </motion.div>

            {/* Center Text (Fades out) */}
            <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none"
            >
                <div className="glass-card px-12 py-10 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <h2 className="text-4xl md:text-6xl font-cinzel text-white mb-4 tracking-wide drop-shadow-lg">
                        Timeless
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto my-6" />
                    <p className="text-pink-100/80 font-playfair italic text-xl md:text-2xl">
                        Every second is a story waiting to be told.
                    </p>
                </div>
            </motion.div>

            {/* Card Mode Indicator / Drag Handle (Visual only) */}
            <motion.div 
                style={{ opacity: isCornerMode ? 1 : 0 }}
                className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full border border-white/10 flex items-center gap-2"
            >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">Live</span>
            </motion.div>

        </motion.div>
      </motion.div>

    </div>
  );
};