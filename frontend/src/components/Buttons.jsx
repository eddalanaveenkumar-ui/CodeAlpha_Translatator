import React from 'react';
import { motion } from 'framer-motion';

export const PrimaryButton = ({ children, onClick, disabled, className = '', type = 'button' }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3.5 
        rounded-2xl 
        font-semibold 
        text-white 
        bg-gradient-to-r from-blue-600 to-indigo-600 
        hover:from-blue-500 hover:to-indigo-500
        focus:outline-none focus:ring-2 focus:ring-blue-500/50 
        shadow-md hover:shadow-lg active:shadow-sm
        transition-all duration-200 
        flex items-center justify-center space-x-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const SecondaryButton = ({ children, onClick, disabled, className = '', type = 'button' }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-3 
        rounded-2xl 
        font-medium 
        text-slate-700 dark:text-slate-200 
        bg-slate-100 hover:bg-slate-200/80 
        dark:bg-slate-800 dark:hover:bg-slate-700/80
        border border-slate-200/50 dark:border-slate-700/50
        focus:outline-none focus:ring-2 focus:ring-slate-500/20 
        transition-all duration-200 
        flex items-center justify-center space-x-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const IconButton = ({ children, onClick, disabled, className = '', title }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.08 }}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`
        p-2.5 
        rounded-xl 
        text-slate-500 dark:text-slate-400
        hover:text-slate-800 dark:hover:text-white
        hover:bg-slate-100 dark:hover:bg-slate-800/80
        border border-transparent hover:border-slate-200/30 dark:hover:border-slate-700/30
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 
        transition-all duration-150 
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
