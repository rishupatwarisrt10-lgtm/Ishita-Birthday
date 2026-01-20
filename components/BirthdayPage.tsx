import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Gift } from 'lucide-react';

interface ConfettiParticle {
  id: number;
  left: string;
  delay: number;
}

export const BirthdayPage: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set window height after component mounts
    setWindowHeight(typeof window !== 'undefined' ? window.innerHeight : 0);
    
    // Generate confetti particles
    const particles: ConfettiParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5,
    }));
    setConfetti(particles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
      }} />

      {/* Confetti Animation */}
      {confetti.map((particle: ConfettiParticle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-pink-400 rounded-full pointer-events-none"
          style={{ left: particle.left, top: '-10px' }}
          animate={{
            y: windowHeight + 20,
            opacity: [1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 text-pink-400/30"
        animate={{ y: [0, -20, 0], rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Sparkles size={32} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-purple-400/30"
        animate={{ y: [0, 20, 0], rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Star size={40} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 text-pink-300/20"
        animate={{ scale: [1, 1.2, 1], rotate: 180 }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Gift size={36} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="relative z-10 px-6 text-center max-w-4xl"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-7xl md:text-9xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-purple-400 mb-4 font-bold">
            Happy Birthday
          </h1>
          <p className="text-2xl md:text-3xl font-playfair italic text-white/80 tracking-wide">
            Ishita
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400" />
          <Heart className="text-pink-400 animate-pulse" size={24} />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400" />
        </motion.div>

        {/* Main Message */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg md:text-2xl font-inter text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto">
            Today is a celebration of you—your kindness, your strength, your grace, and the incredible person you are.
          </p>
          <p className="text-lg md:text-xl font-playfair italic text-pink-200/80 mb-6">
            May this year bring you endless joy, beautiful moments, and all the happiness you deserve.
          </p>
        </motion.div>

        {/* Wishes */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Sparkles, text: "Shine Bright", color: "from-pink-400 to-pink-600" },
            { icon: Heart, text: "Love & Joy", color: "from-purple-400 to-purple-600" },
            { icon: Star, text: "Dream Big", color: "from-blue-400 to-blue-600" },
          ].map((wish, idx) => {
            const Icon = wish.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${wish.color} bg-opacity-10 border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all`}
              >
                <Icon className="mx-auto mb-3 text-white" size={28} />
                <p className="font-cinzel text-lg text-white">{wish.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-cinzel tracking-widest uppercase text-sm font-bold overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center justify-center gap-2">
              <Heart size={18} className="fill-current" />
              Celebrate With Me
            </span>
          </motion.button>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-sm text-white/50 uppercase tracking-[0.2em] font-inter"
        >
          With love and warmest wishes
        </motion.p>
      </motion.div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "inset 0 0 0 1px rgba(236, 72, 153, 0)",
            "inset 0 0 0 1px rgba(236, 72, 153, 0.5)",
            "inset 0 0 0 1px rgba(236, 72, 153, 0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
};
