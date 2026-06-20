import React from 'react';
import { FiCopy, FiDownload, FiVolume2 } from 'react-icons/fi';
import { IconButton } from './Buttons.jsx';
import { copyToClipboard } from '../utils/copy.js';
import { downloadTranslation } from '../utils/download.js';
import { speakText } from '../utils/speech.js';
import Loader from './Loader.jsx';

export const OutputCard = ({ 
  translatedText, 
  sourceLang, 
  targetLang, 
  loading, 
  isSpeaking, 
  setIsSpeaking,
  provider
}) => {
  const handleSpeak = () => {
    speakText(
      translatedText, 
      targetLang, 
      () => setIsSpeaking(true), 
      () => setIsSpeaking(false)
    );
  };

  const handleDownload = () => {
    downloadTranslation(translatedText, sourceLang, targetLang);
  };

  return (
    <div className="
      glass-card glow-blue 
      w-full h-full 
      rounded-24px p-6 md:p-7
      flex flex-col 
      relative overflow-hidden
      transition-all duration-300
    ">
      {/* Loading Overlay */}
      {loading && (
        <div className="
          absolute inset-0 z-10 
          bg-white/70 dark:bg-slate-900/70 
          backdrop-blur-sm 
          flex items-center justify-center
          transition-all duration-300
        ">
          <Loader text="Translating text..." />
        </div>
      )}

      {/* Translation Content */}
      <div className="flex-1 flex flex-col min-h-[220px] md:min-h-[280px]">
        {translatedText ? (
          <div className="
            w-full flex-grow 
            text-slate-800 dark:text-white 
            text-base font-normal leading-relaxed
            overflow-y-auto select-text
          ">
            {translatedText}
          </div>
        ) : (
          <div className="
            w-full flex-grow 
            text-slate-400 dark:text-slate-500
            text-base font-normal leading-relaxed
            flex items-center justify-center select-none
            text-center
          ">
            Translation will appear here...
          </div>
        )}
      </div>

      {/* Footer / Control Row */}
      <div className="
        mt-4 pt-4 
        border-t border-slate-200/40 dark:border-slate-700/40 
        flex items-center justify-between
      ">
        {/* Left Utilities */}
        <div className="flex items-center space-x-1.5">
          <IconButton
            onClick={handleSpeak}
            disabled={!translatedText || translatedText.trim() === ''}
            title={isSpeaking ? "Stop Speaking" : "Listen to Translation"}
            className={isSpeaking ? "text-blue-500 dark:text-blue-400 bg-blue-500/10" : ""}
          >
            <FiVolume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
          </IconButton>
          
          <IconButton
            onClick={() => copyToClipboard(translatedText, 'Translation')}
            disabled={!translatedText || translatedText.trim() === ''}
            title="Copy Translation"
          >
            <FiCopy className="w-4 h-4" />
          </IconButton>
          
          <IconButton
            onClick={handleDownload}
            disabled={!translatedText || translatedText.trim() === ''}
            title="Download Translation (.txt)"
          >
            <FiDownload className="w-4 h-4" />
          </IconButton>
        </div>

        {/* Right Info: Provider Tag */}
        {provider && translatedText && (
          <div className="
            text-[9px] font-bold uppercase tracking-widest
            px-2.5 py-1 rounded-lg
            bg-slate-100 dark:bg-slate-800
            text-slate-400 dark:text-slate-500
            border border-slate-200/20 dark:border-slate-700/20
            select-none
          ">
            API: {provider}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
