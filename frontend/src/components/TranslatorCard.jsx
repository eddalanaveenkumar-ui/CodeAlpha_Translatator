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
  setIsSpeakingOutput
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

      {/* 2. Text Input & Output Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="h-full">
          <TextInput
            text={text}
            onChange={setText}
            sourceLang={sourceLang}
            onTranslate={onTranslate}
            isSpeaking={isSpeakingInput}
            setIsSpeaking={setIsSpeakingInput}
          />
        </div>
        
        <div className="h-full">
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
        <PrimaryButton
          onClick={onTranslate}
          disabled={loading || !text || text.trim() === ''}
          className="w-full sm:w-auto sm:px-12 py-4 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/5"
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
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TranslatorCard;
