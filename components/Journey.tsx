import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MessageCircle, Zap, Users, Heart, Star, Shield, Gift } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const storyEvents = [
  {
    icon: <MessageCircle size={32} />,
    title: "The Unconventional Intro",
    text: "It started with me threatening you to leave the community, and you stubbornly refusing to join the meets. A rocky start that hid a gem.",
    color: "text-red-400",
    bg: "from-red-900/40",
    img: "/images/ishita-1.jpg" // Abstract/Textured Red
  },
  {
    icon: <Zap size={32} />,
    title: "The Silent Pitch",
    text: "I asked you about the startup idea. The response? Absolute silence. A quiet mystery before the collaboration.",
    color: "text-yellow-400",
    bg: "from-yellow-900/40",
    img: "/images/ishita-2.jpg" // Moody fashion
  },
  {
    icon: <Users size={32} />,
    title: "The Alliance",
    text: "Despite it all, we brought you on board for non-tech magic. You became a vital part of the team puzzle.",
    color: "text-blue-400",
    bg: "from-blue-900/40",
    img: "/images/ishita-3.jpg" // Team/Collaboration abstract
  },
  {
    icon: <Heart size={32} />,
    title: "Finding Frequency",
    text: "We started talking. What began as work turned into hours of great conversation. We found our rhythm.",
    color: "text-pink-400",
    bg: "from-pink-900/40",
    img: "/images/ishita-4.jpg" // Connection/Light
  },
  {
    icon: <Star size={32} />,
    title: "The Trio",
    text: "Good times shared with Keerthika. Laughter, inside jokes, and memories that I'll cherish forever.",
    color: "text-purple-400",
    bg: "from-purple-900/40",
    img: "/images/ishita-5.jpg" // Joyful/Bright
  },
  {
    icon: <Shield size={32} />,
    title: "Inner Strength",
    text: "You are full of strength.",
    color: "text-green-400",
    bg: "from-green-900/40",
    img: "/images/ishita-6.jpg" // Strong/Portrait
  },
  {
    icon: <Gift size={32} />,
    title: "My One & Only",
    text: "Through it all, I realized—I have only one true friend. That's You. May Lord Krishna shower you with every happiness in the universe.",
    color: "text-orange-400",
    bg: "from-orange-900/40",
    img: "/images/ishita-1.jpg" // Gift/Celebration
  }
];

export const Journey: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          pin: true,
          start: "top top",
          end: "+=8000",
          scrub: 1.5,
        }
      });

      const steps = gsap.utils.toArray('.journey-step');
      const bgs = gsap.utils.toArray('.journey-bg');

      steps.forEach((step: any, i) => {
        const bg = bgs[i] as HTMLElement;
        const bgInner = bg.querySelector('.bg-inner');

        // --- ANIMATION CONFIGURATION ---
        
        let fromProps = { autoAlpha: 0, y: 150, x: 0, rotateX: -10, scale: 0.9, filter: "blur(15px)" };
        let toProps = { autoAlpha: 1, y: 0, x: 0, rotateX: 0, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" };

        if (i === 1) { 
           // From Top
           fromProps = { autoAlpha: 0, y: -150, x: 0, rotateX: 10, scale: 0.9, filter: "blur(15px)" };
        } 
        else if (i === 3 || i === 5) {
           // From Right
           fromProps = { autoAlpha: 0, y: 0, x: 200, rotateX: 0, scale: 0.9, filter: "blur(20px)" };
        } 
        else if (i === 4) {
           // From Left
           fromProps = { autoAlpha: 0, y: 0, x: -200, rotateX: 0, scale: 0.9, filter: "blur(20px)" };
        }
        else if (i === 6) {
           // Finale Zoom
           fromProps = { autoAlpha: 0, y: 0, x: 0, rotateX: 0, scale: 2.5, filter: "blur(30px)" };
           toProps.ease = "circ.out";
        }

        // --- TIMELINE SEQUENCE ---
        const entranceTl = gsap.timeline()
          .fromTo(step, fromProps, toProps)
          .fromTo(bg,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" },
            "<" 
          )
          .fromTo(bgInner,
            { scale: 1.2 },
            { scale: 1.0, duration: 4, ease: "none" }, 
            "<"
          );
        
        tl.add(entranceTl);
        tl.to({}, { duration: 2.5 }); // Hold

        if (i < steps.length - 1) {
          const exitTl = gsap.timeline()
             .to(step, 
              { autoAlpha: 0, y: -80, scale: 0.95, filter: "blur(15px)", duration: 1, ease: "power2.in" }
            )
            .to(bg,
              { autoAlpha: 0, duration: 1 },
              "<"
            );
          tl.add(exitTl);
        }
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (import.meta.env.DEV) {
      console.warn(`Could not load image: ${e.currentTarget.src}`);
    }
    // Fallback to a gradient if external image also fails
    e.currentTarget.src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000";
  };

  return (
    <section ref={comp} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Layer Stack */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-20 pointer-events-none mix-blend-multiply" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-20 pointer-events-none" /> 
        
        {storyEvents.map((event, index) => (
          <div 
            key={`bg-${index}`}
            className="journey-bg absolute inset-0 z-10 opacity-0 overflow-hidden"
          >
             <div className="bg-inner w-full h-full bg-[#111]">
                <img 
                  src={event.img} 
                  alt={event.title} 
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
             </div>
            <div className={`absolute inset-0 bg-gradient-to-t ${event.bg} via-transparent to-transparent opacity-60 mix-blend-overlay`} />
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-6">
        {storyEvents.map((_, i) => (
          <div key={i} className="group flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
             <span className="text-[10px] uppercase tracking-widest text-white/0 group-hover:text-white/40 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 font-inter">
               0{i+1}
             </span>
          </div>
        ))}
      </div>

      {/* Main Content Card Container */}
      <div className="relative z-40 w-full max-w-4xl px-6 h-full flex items-center justify-center">
        {storyEvents.map((event, index) => (
          <div 
            key={index} 
            className="journey-step absolute inset-0 flex items-center justify-center opacity-0 invisible"
          >
            <div className={`
              glass-card p-8 md:p-12 rounded-[2rem] border border-white/10 
              flex flex-col items-center text-center max-w-2xl 
              bg-black/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]
              hover:scale-[1.02] hover:bg-white/5 transition-all duration-500 cursor-default
            `}>
              <div className={`
                p-5 rounded-full bg-white/5 mb-8 ${event.color} 
                ring-1 ring-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]
                group-hover:scale-110 transition-transform duration-500
              `}>
                {event.icon}
              </div>
              
              <h3 className={`text-3xl md:text-5xl font-cinzel mb-8 ${event.color} drop-shadow-lg tracking-wide`}>
                {event.title}
              </h3>
              
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8" />
              
              <p className="text-xl md:text-2xl font-light text-gray-100 leading-loose font-playfair tracking-wide">
                {event.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};