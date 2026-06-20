import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiClock, FiCornerDownRight } from 'react-icons/fi';
import { getLanguageName } from '../utils/languages.js';
import { IconButton } from './Buttons.jsx';

export const History = ({ historyList, onRestore, onClearAll, onDeleteItem }) => {
  if (!historyList || historyList.length === 0) {
    return (
      <div className="
        glass-card glow-blue 
        p-8 rounded-24px text-center 
        transition-all duration-300
        flex flex-col items-center justify-center space-y-3.5
      ">
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-4xl select-none"
        >
          🕘
        </motion.div>
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No translations yet</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[220px] mx-auto leading-relaxed">
            Translate something to build your history log.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="
      glass-card glow-blue 
      p-6 md:p-7 rounded-24px 
      transition-all duration-300
      flex flex-col space-y-4
    ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FiClock className="w-5 h-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Recent Translation History
          </h2>
          <span className="
            px-2 py-0.5 rounded-full 
            bg-blue-500/10 text-blue-600 dark:text-blue-400
            text-[10px] font-bold
          ">
            {historyList.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="
            text-xs font-semibold 
            text-red-500 hover:text-red-600 dark:hover:text-red-400
            hover:underline focus:outline-none
            transition-colors duration-150
          "
        >
          Clear All
        </button>
      </div>

      {/* History List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[380px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {historyList.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between group overflow-hidden"
            >
              {/* Left Content clickable */}
              <button
                type="button"
                onClick={() => onRestore(item)}
                className="flex-1 text-left pr-4 focus:outline-none"
              >
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">
                  <span>{getLanguageName(item.sourceLang)}</span>
                  <FiCornerDownRight className="w-3.5 h-3.5 text-blue-500/50" />
                  <span className="text-blue-500 dark:text-blue-400">{getLanguageName(item.targetLang)}</span>
                </div>
                
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.text}
                </div>
                
                <div className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 italic mt-0.5">
                  {item.translatedText}
                </div>
              </button>

              {/* Delete Icon */}
              <div className="shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                <IconButton
                  onClick={() => onDeleteItem(item.id)}
                  title="Remove from history"
                  className="p-2 hover:bg-red-500/10 dark:hover:bg-red-500/10 hover:text-red-500 text-slate-400"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </IconButton>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default History;
