import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import LanguageSelector from './LanguageSelector.jsx';
import TextInput from './TextInput.jsx';
import OutputCard from './OutputCard.jsx';
import { PrimaryButton } from './Buttons.jsx';
import { FiActivity } from 'react-icons/fi';

export const TranslatorCard = ({
  text,
  setText,
  translatedText,
  sourceLang,
  setSourceLang,
  targetLang,
  setTargetLang,
  loading,
  onTranslate,
  provider,
  isSpeakingInput,
  setIsSpeakingInput,
  isSpeakingOutput,
  setIsSpeakingOutput,
  activeTab,
  setActiveTab
}) => {
  
  // Swap source and target languages
  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') return; // Cannot have auto as target language
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      
      {/* 1. Language Selectors & Swap Panel */}
      <div className="
        relative z-20
        glass-card glow-blue 
        p-4 md:p-5 
        rounded-24px 
        flex flex-col sm:flex-row items-center justify-between gap-4
        transition-all duration-300
      ">
        {/* Source Language */}
        <div className="w-full sm:flex-1">
          <LanguageSelector
            label="Translate From"
            selectedValue={sourceLang}
            onChange={setSourceLang}
            showAutoDetect={true}
          />
        </div>

        {/* Swap Button (Desktop and Mobile layout) */}
        <div className="shrink-0 flex items-center justify-center pt-5 sm:pt-4">
          <motion.button
            whileHover={{ scale: sourceLang === 'auto' ? 1 : 1.1, rotate: sourceLang === 'auto' ? 0 : 180 }}
            whileTap={{ scale: sourceLang === 'auto' ? 1 : 0.9 }}
            onClick={handleSwapLanguages}
            disabled={sourceLang === 'auto'}
            type="button"
            title={sourceLang === 'auto' ? "Cannot swap when source is Auto Detect" : "Swap Languages"}
            className="
              p-3.5 rounded-2xl
              bg-slate-100 hover:bg-slate-200/80 
              dark:bg-slate-800 dark:hover:bg-slate-700/80
              border border-slate-200/40 dark:border-slate-700/40
              text-slate-600 dark:text-slate-300
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            <HiOutlineSwitchHorizontal className="w-5 h-5 hidden sm:block" />
            <HiOutlineSwitchHorizontal className="w-5 h-5 sm:hidden rotate-90" />
          </motion.button>
        </div>

        {/* Target Language */}
        <div className="w-full sm:flex-1">
          <LanguageSelector
            label="Translate To"
            selectedValue={targetLang}
            onChange={setTargetLang}
            showAutoDetect={false}
          />
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden w-full p-1 rounded-2xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 mb-1">
        <button
          type="button"
          onClick={() => setActiveTab('input')}
          className={`
            flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200
            ${activeTab === 'input' 
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}
          `}
        >
          Source Text
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('output')}
          className={`
            flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200
            ${activeTab === 'output' 
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}
          `}
        >
          Translation
        </button>
      </div>

      {/* 2. Text Input & Output Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className={`h-full ${activeTab === 'input' ? 'block' : 'hidden lg:block'}`}>
          <TextInput
            text={text}
            onChange={setText}
            sourceLang={sourceLang}
            onTranslate={onTranslate}
            isSpeaking={isSpeakingInput}
            setIsSpeaking={setIsSpeakingInput}
          />
        </div>
        
        <div className={`h-full ${activeTab === 'output' ? 'block' : 'hidden lg:block'}`}>
          <OutputCard
            translatedText={translatedText}
            sourceLang={sourceLang}
            targetLang={targetLang}
            loading={loading}
            isSpeaking={isSpeakingOutput}
            setIsSpeaking={setIsSpeakingOutput}
            provider={provider}
          />
        </div>
      </div>

      {/* 3. Action Panel (Translate Trigger) */}
      <div className="flex justify-center pt-2">
        <motion.button
          whileHover={{ 
            scale: (loading || !text || text.trim() === '') ? 1 : 1.03,
            boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" 
          }}
          whileTap={{ scale: (loading || !text || text.trim() === '') ? 1 : 0.97 }}
          onClick={onTranslate}
          disabled={loading || !text || text.trim() === ''}
          type="button"
          className="
            w-full sm:w-auto sm:px-16 py-4 
            rounded-2xl 
            font-bold text-sm uppercase tracking-wider
            text-white 
            bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
            hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500
            shadow-[0_15px_35px_rgba(59,130,246,0.25)]
            dark:shadow-[0_15px_35px_rgba(99,102,241,0.15)]
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 
            transition-all duration-200 
            flex items-center justify-center space-x-2.5
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <FiActivity className="w-5 h-5 animate-spin" />
              <span>Translating...</span>
            </>
          ) : (
            <>
              <span>Translate Text</span>
              <HiOutlineArrowNarrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default TranslatorCard;
