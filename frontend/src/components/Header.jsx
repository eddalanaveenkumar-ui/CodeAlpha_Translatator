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
            bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 
            text-white 
            shadow-[0_0_20px_rgba(59,130,246,0.4)]
          ">
            {/* Ambient Logo Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur-md opacity-45 -z-10" />
            <HiOutlineTranslate className="w-6 h-6 animate-pulse" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className="
                text-lg md:text-xl font-bold tracking-tight
                bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 
                dark:from-white dark:via-blue-400 dark:to-indigo-400 
                bg-clip-text text-transparent
              ">
                Lumina Translator
              </h1>
              <span className="
                px-1.5 py-0.5 rounded-md 
                bg-slate-100 dark:bg-slate-800 
                text-[9px] font-bold text-slate-500 dark:text-slate-400
                border border-slate-200/50 dark:border-slate-700/50
              ">
                v1.0
              </span>
            </div>
            <div className="flex items-center space-x-1.5 -mt-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                System Online
              </span>
            </div>
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
