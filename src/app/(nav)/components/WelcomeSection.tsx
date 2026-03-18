"use client"

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

export function WelcomeSection() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scritta di benvenuto si sposta verso l'alto durante lo scroll
  const welcomeY = useTransform(scrollY, [0, 300], [0, -400]);
  const welcomeOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);

  return (
    <motion.div
      className="w-full px-4 md:px-8"
      style={{
        top: '18%',
        y: welcomeY,
        opacity: welcomeOpacity,
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 md:mb-4 bg-linear-to-r from-brand-1 via-brand-2 to-brand-3 bg-clip-text text-transparent drop-shadow-2xl">
          Benvenuto su Ciolaflix
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl transition-colors duration-500 text-foreground/60">
          Esplora un universo infinito di intrattenimento
        </p>
      </div>
    </motion.div>
  );
}