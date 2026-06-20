import React, { useRef } from 'react';
import { FiCopy, FiTrash2, FiVolume2 } from 'react-icons/fi';
import { IconButton } from './Buttons.jsx';
import { copyToClipboard } from '../utils/copy.js';
import { speakText } from '../utils/speech.js';

export const TextInput = ({ 
  text, 
  onChange, 
  sourceLang, 
  onTranslate, 
  isSpeaking, 
  setIsSpeaking 
}) => {
  const textareaRef = useRef(null);
  const maxChars = 5000;

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= maxChars) {
      onChange(val);
    }
  };

  // Keyboard shortcut Ctrl + Enter to translate
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      onTranslate();
    }
  };

  const handleClear = () => {
    onChange('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSpeak = () => {
    // If source language is 'auto', we might read with 'en' fallback or wait
    const speakLang = sourceLang === 'auto' ? 'en' : sourceLang;
    speakText(
      text, 
      speakLang, 
      () => setIsSpeaking(true), 
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="
      glass-card glow-blue 
      w-full h-full 
      rounded-24px p-6 md:p-7
      flex flex-col 
      transition-all duration-300
    ">
      <div className="flex-1 flex flex-col min-h-[220px] md:min-h-[280px]">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter text to translate..."
          maxLength={maxChars}
          className="
            w-full flex-grow bg-transparent 
            text-slate-800 dark:text-white 
            placeholder-slate-400 dark:placeholder-slate-500
            text-base font-normal leading-relaxed
            resize-none border-none outline-none
            focus:ring-0
          "
          aria-label="Source Text Input"
        />
      </div>

      {/* Control Actions Row */}
      <div className="
        mt-4 pt-4 
        border-t border-slate-200/40 dark:border-slate-700/40 
        flex items-center justify-between
      ">
        {/* Left Utilities */}
        <div className="flex items-center space-x-1.5">
          <IconButton
            onClick={handleSpeak}
            disabled={!text || text.trim() === ''}
            title={isSpeaking ? "Stop Speaking" : "Listen to Input"}
            className={isSpeaking ? "text-blue-500 dark:text-blue-400 bg-blue-500/10" : ""}
          >
            <FiVolume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
          </IconButton>
          
          <IconButton
            onClick={() => copyToClipboard(text, 'Source text')}
            disabled={!text || text.trim() === ''}
            title="Copy Original Text"
          >
            <FiCopy className="w-4 h-4" />
          </IconButton>
          
          <IconButton
            onClick={handleClear}
            disabled={!text || text.trim() === ''}
            title="Clear Text"
          >
            <FiTrash2 className="w-4 h-4 hover:text-red-500" />
          </IconButton>
        </div>

        {/* Right Info: Char Counter & ShortKey */}
        <div className="flex items-center space-x-4 select-none">
          <span className="
            hidden sm:inline-block 
            text-[10px] uppercase font-bold tracking-wider 
            text-slate-400 dark:text-slate-500
          ">
            Ctrl + Enter to translate
          </span>
          <div className="
            text-xs font-semibold 
            text-slate-400 dark:text-slate-500
          ">
            <span>{text.length}</span>
            <span className="opacity-50"> / {maxChars}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
