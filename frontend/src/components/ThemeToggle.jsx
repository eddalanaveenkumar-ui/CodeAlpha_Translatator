import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme.js';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      id="theme-toggle"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle Theme"
      className="
        relative p-3 
        rounded-2xl 
        bg-white/80 dark:bg-slate-800/80 
        border border-slate-200/50 dark:border-slate-700/50 
        shadow-sm hover:shadow-md 
        text-slate-700 dark:text-amber-400
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 
        transition-colors duration-300
        overflow-hidden
        w-11 h-11 flex items-center justify-center
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <FiSun className="w-5 h-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <FiMoon className="w-5 h-5 text-blue-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
