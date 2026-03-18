"use client"

import { motion, useScroll, useTransform } from 'motion/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnimatedSearchBarProps {
  onSearch?: (query: string) => void;
}

export function AnimatedSearchBar({ onSearch }: AnimatedSearchBarProps) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // La barra di ricerca parte dal centro e si sposta in alto
  const searchY = useTransform(scrollY, [0, 300], [0, -400]);
  const searchOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
  const searchScale = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
    <motion.div
      className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-4"
      style={{
        top: '40%',
        y: searchY,
        opacity: searchOpacity,
        scale: searchScale,
      }}
    >
      <motion.div 
        className="relative"
        animate={{
          scale: searchFocused ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Glow effect base */}
        <div className={`absolute inset-0 blur-2xl rounded-3xl transition-colors duration-500 brand-glow`} />
        
        {/* Glow effect extra quando focused */}
        {searchFocused && (
          <motion.div
            className="absolute -inset-2 brand-glow-strong blur-3xl rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        
        <form 
          className={`relative backdrop-blur-2xl rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-2xl transition-all duration-500 bg-white/5 border border-white/20
             ${searchFocused ? 'shadow-[0_0_30px_rgba(255,94,26,0.4)]' : ''}`}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const query = formData.get('q') as string;
            if (query.trim()) onSearch?.(query);
          }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <Search className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 transition-colors duration-500 text-brand-3`} />
            <input
              name="q"
              type="text"
              placeholder="Cerca film, serie..."
              className={`flex-1 bg-transparent outline-none text-base md:text-lg transition-colors duration-500 text-foreground placeholder-foreground/60`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}