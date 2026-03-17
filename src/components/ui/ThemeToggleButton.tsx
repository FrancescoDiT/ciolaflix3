'use client'
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ThemeToggleButton = () => {
    const [isDark, setIsDark] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const html = document.querySelector('html');
        setIsDark(html?.classList.contains('dark') || false);
    }, []);

    const switchTheme = () => {
        const html = document.querySelector('html');
        html?.classList.toggle('dark');
        setIsDark(!isDark);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={switchTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-purple-500" />
                )}
            </motion.div>
        </motion.button>
    );
};
export default ThemeToggleButton
