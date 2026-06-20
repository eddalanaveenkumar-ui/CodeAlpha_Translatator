import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch, FiX } from 'react-icons/fi';
import { languages, getLanguageName } from '../utils/languages.js';

export const LanguageSelector = ({ selectedValue, onChange, showAutoDetect = false, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter languages based on search query
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Get flag representation
  const getSelectedLanguageFlag = () => {
    if (selectedValue === 'auto') return '🔍';
    const lang = languages.find(l => l.code === selectedValue);
    return lang ? lang.flag : '🌐';
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 ml-1">
          {label}
        </span>
      )}
      
      {/* Dropdown Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full px-4 py-3 
          rounded-2xl 
          bg-white dark:bg-slate-800 
          border border-slate-200/80 dark:border-slate-700/80 
          hover:border-blue-400 dark:hover:border-blue-500
          text-slate-800 dark:text-white 
          font-medium text-sm
          shadow-sm hover:shadow-md
          flex items-center justify-between 
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          transition-all duration-200
        "
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2.5">
          <span className="text-lg">{getSelectedLanguageFlag()}</span>
          <span>{getLanguageName(selectedValue)}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>

      {/* Dropdown Option List Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              absolute z-50 left-0 right-0 mt-2
              max-h-[340px]
              rounded-2xl 
              bg-white dark:bg-slate-800 
              border border-slate-200/90 dark:border-slate-700/90 
              shadow-xl dark:shadow-2xl dark:shadow-slate-950/40 
              overflow-hidden
              flex flex-col
            "
          >
            {/* Search Input Box */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-700/50 flex items-center space-x-2">
              <FiSearch className="text-slate-400 w-4 h-4 shrink-0" />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full bg-transparent 
                  text-slate-800 dark:text-white 
                  placeholder-slate-400 dark:placeholder-slate-500
                  text-sm font-medium
                  focus:outline-none
                "
                autoFocus
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* List Container */}
            <div className="overflow-y-auto flex-1 py-1 max-h-[280px]">
              {showAutoDetect && searchQuery === '' && (
                <button
                  type="button"
                  onClick={() => handleSelect('auto')}
                  className={`
                    w-full px-4 py-2.5 
                    text-left text-sm font-medium
                    flex items-center space-x-2.5
                    transition-colors duration-150
                    ${selectedValue === 'auto' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30'}
                  `}
                >
                  <span className="text-lg">🔍</span>
                  <div>
                    <span>Auto Detect</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">Detect input language automatically</span>
                  </div>
                </button>
              )}

              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`
                      w-full px-4 py-2.5 
                      text-left text-sm font-medium
                      flex items-center justify-between
                      transition-colors duration-150
                      ${selectedValue === lang.code 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30'}
                    `}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                    <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                      {lang.nativeName}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
                  No languages found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
