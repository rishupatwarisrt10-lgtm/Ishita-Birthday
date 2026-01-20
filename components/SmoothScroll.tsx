import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Smooth duration for fluid scrolling
      easing: (t) => {
        // Custom easing for ultra-smooth scroll feel
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Optimized RAF loop for better performance
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if available
    const updateScrollTrigger = () => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        (window as any).gsap.ticker.add(() => {
          (window as any).ScrollTrigger?.update?.();
        });
      }
    };

    updateScrollTrigger();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};