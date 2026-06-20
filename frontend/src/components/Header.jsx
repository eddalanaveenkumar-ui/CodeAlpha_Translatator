import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineTranslate } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle.jsx';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="
        sticky top-0 z-40 
        w-full 
        bg-white/70 dark:bg-slate-900/60 
        backdrop-blur-md 
        border-b border-slate-200/40 dark:border-slate-800/40 
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 select-none">
          <div className="
            relative flex items-center justify-center 
            w-11 h-11 
            rounded-2xl 
            bg-gradient-to-tr from-blue-600 to-indigo-600 
            text-white 
            shadow-md shadow-blue-500/20
          ">
            {/* Ambient Logo Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-30 -z-10" />
            <HiOutlineTranslate className="w-6 h-6 animate-pulse" />
          </div>
          
          <div className="flex flex-col">
            <h1 className="
              text-lg md:text-xl font-bold tracking-tight
              bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 
              dark:from-white dark:via-blue-400 dark:to-indigo-400 
              bg-clip-text text-transparent
            ">
              Lumina
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 -mt-1">
              Translator SaaS
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
