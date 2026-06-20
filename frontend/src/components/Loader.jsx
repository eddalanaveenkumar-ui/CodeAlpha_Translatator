import React from 'react';
import { motion } from 'framer-motion';

export const Loader = ({ size = 'md', text = 'Translating...' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <div className="relative flex items-center justify-center">
        {/* Glowing backdrop halo */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full w-12 h-12 animate-pulse" />
        
        {/* Animated spinner ring */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-blue-500/20 border-t-blue-600 dark:border-blue-400/20 dark:border-t-blue-400`}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "linear"
          }}
        />
      </div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
