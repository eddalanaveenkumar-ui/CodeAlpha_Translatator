import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header.jsx';
import TranslatorCard from '../components/TranslatorCard.jsx';
import History from '../components/History.jsx';
import Footer from '../components/Footer.jsx';
import api from '../utils/api.js';

export const Home = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('fr'); // Default to French
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState('');
  const [historyList, setHistoryList] = useState([]);
  
  // Text to Speech states to animate mic/speaker buttons
  const [isSpeakingInput, setIsSpeakingInput] = useState(false);
  const [isSpeakingOutput, setIsSpeakingOutput] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('translation_history');
      if (savedHistory) {
        setHistoryList(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to parse translation history:', error);
    }
  }, []);

  // Translate function
  const handleTranslate = async () => {
    if (!text || text.trim() === '') {
      toast.error('Please enter some text to translate.', {
        id: 'empty-text-validation',
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff'
        }
      });
      return;
    }

    setLoading(true);
    setTranslatedText('');
    setProvider('');

    try {
      const response = await api.post('/translate', {
        text: text,
        source: sourceLang,
        target: targetLang
      });

      if (response.data) {
        const transResult = response.data.translatedText;
        const detectedSource = response.data.detectedSourceLanguage;
        const providerName = response.data.provider;

        setTranslatedText(transResult);
        setProvider(providerName);

        // Update translation history
        const newHistoryItem = {
          id: Date.now().toString(),
          text: text,
          translatedText: transResult,
          sourceLang: sourceLang === 'auto' && detectedSource ? detectedSource : sourceLang,
          targetLang: targetLang,
          timestamp: new Date().toISOString()
        };

        setHistoryList((prevList) => {
          // Filter duplicates of same original text and same lang pair to keep history clean
          const filtered = prevList.filter(
            (item) => !(item.text.trim().toLowerCase() === text.trim().toLowerCase() && 
                       item.sourceLang === newHistoryItem.sourceLang && 
                       item.targetLang === targetLang)
          );
          
          const updated = [newHistoryItem, ...filtered].slice(0, 10); // Cap at 10 items
          localStorage.setItem('translation_history', JSON.stringify(updated));
          return updated;
        });

        toast.success('Translated successfully!', {
          icon: '✨',
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#fff'
          }
        });
      }
    } catch (error) {
      console.error('Translation error:', error);
      let errorMsg = 'Failed to connect to the translation server.';
      
      if (error.code === 'ECONNABORTED') {
        errorMsg = 'Translation request timed out. Please try again.';
      } else if (error.response && error.response.data) {
        errorMsg = error.response.data.message || error.response.data.error || errorMsg;
      }
      
      toast.error(errorMsg, {
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Restore history item
  const handleRestoreHistoryItem = (item) => {
    setText(item.text);
    setTranslatedText(item.translatedText);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    
    toast.success('Restored translation from history!', {
      icon: '🔄',
      style: {
        borderRadius: '12px',
        background: '#1e293b',
        color: '#fff'
      }
    });
  };

  // Delete single history item
  const handleDeleteHistoryItem = (id) => {
    const updated = historyList.filter(item => item.id !== id);
    setHistoryList(updated);
    localStorage.setItem('translation_history', JSON.stringify(updated));
    toast.success('Removed history entry', {
      style: {
        borderRadius: '12px',
        background: '#1e293b',
        color: '#fff'
      }
    });
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all translation history?')) {
      setHistoryList([]);
      localStorage.removeItem('translation_history');
      toast.success('Cleared all translation history!', {
        icon: '🧹',
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff'
        }
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 md:py-14 flex flex-col space-y-12">
        {/* Intro Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="
            inline-flex items-center space-x-2 
            px-3 py-1 rounded-full 
            bg-blue-500/10 text-blue-600 dark:text-blue-400
            text-xs font-semibold select-none
          ">
            <span>🚀</span>
            <span>Premium SaaS Translation Tool</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Translate Any Language Seamlessly
          </h2>
          
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
            Powered by Microsoft and Google Cloud translation services. Translate text, listen to pronunciations, and export file archives immediately.
          </p>
        </motion.div>

        {/* Core Translator Card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TranslatorCard
            text={text}
            setText={setText}
            translatedText={translatedText}
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            loading={loading}
            onTranslate={handleTranslate}
            provider={provider}
            isSpeakingInput={isSpeakingInput}
            setIsSpeakingInput={setIsSpeakingInput}
            isSpeakingOutput={isSpeakingOutput}
            setIsSpeakingOutput={setIsSpeakingOutput}
          />
        </motion.div>

        {/* History Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto w-full"
        >
          <History
            historyList={historyList}
            onRestore={handleRestoreHistoryItem}
            onClearAll={handleClearAllHistory}
            onDeleteItem={handleDeleteHistoryItem}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
