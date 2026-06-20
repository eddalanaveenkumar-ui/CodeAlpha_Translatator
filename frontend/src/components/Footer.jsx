import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="
      w-full py-8 mt-12
      border-t border-slate-200/40 dark:border-slate-800/40
      text-center select-none
    ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
        <div>
          &copy; {currentYear} Lumina Translate. All rights reserved.
        </div>
        <div className="flex items-center space-x-1">
          <span>Crafted with</span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span>using React + Node.js + Express</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
