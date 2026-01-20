import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { Hero } from './components/Hero';
import { HorizontalGallery } from './components/HorizontalGallery';
import { GeminiWish } from './components/GeminiWish';
import { FinalWish } from './components/FinalWish';
import { BirthdayPage } from './components/BirthdayPage';
import { Journey } from './components/Journey';
import { IntroOverlay } from './components/IntroOverlay';
import { AudioPlayer } from './components/AudioPlayer';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStarted = () => {
    setIsStarted(true);
  };

  return (
    <>
      <AudioPlayer shouldAutoPlay={isStarted} />
      
      <AnimatePresence>
        {!isStarted && (
          <IntroOverlay onOpen={handleStarted} />
        )}
      </AnimatePresence>
      
      <SmoothScroll>
        <main className={`w-full bg-black text-white selection:bg-pink-500/30 selection:text-pink-200 transition-opacity duration-1000 ${isStarted ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          <Hero />
          
          {/* Transition Spacer */}
          <div className="h-[20vh] bg-gradient-to-b from-[#000000] to-[#050505] relative z-20" />
          
          <HorizontalGallery />
          
          <Journey />

          {/* Transition Spacer */}
          <div className="h-[10vh] bg-gradient-to-b from-[#000000] to-[#0f0c29] relative z-20" />
          
          <div className="relative bg-[#0f0c29]">
             <GeminiWish />
          </div>

          <FinalWish />
          
          <BirthdayPage />
        </main>
      </SmoothScroll>
    </>
  );
};

export default App;