import toast from 'react-hot-toast';

let currentUtterance = null;

/**
 * Speaks text using the Web Speech Synthesis API
 * @param {string} text Text to vocalize
 * @param {string} langCode Language code (e.g. 'fr', 'es')
 * @param {function} onStart Callback when speech starts
 * @param {function} onEnd Callback when speech finishes
 */
export const speakText = (text, langCode, onStart = () => {}, onEnd = () => {}) => {
  if (!text || text.trim() === '') {
    toast.error('No text to speak!');
    return;
  }

  const synth = window.speechSynthesis;
  if (!synth) {
    toast.error('Text-to-speech not supported in this browser.');
    return;
  }

  // If already speaking, cancel it (acts as a toggle: play/stop)
  if (synth.speaking) {
    synth.cancel();
    // If we're clicking the same voice, just stop it and return
    if (currentUtterance && currentUtterance.text === text) {
      onEnd();
      currentUtterance = null;
      return;
    }
  }

  try {
    // Create new Speech Synthesis Utterance
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    // Try to match voice with the target language code
    const voices = synth.getVoices();
    
    // Normalize language codes (e.g. 'en' -> 'en-US' or matches 'en-GB')
    let matchedVoice = voices.find(voice => 
      voice.lang.toLowerCase() === langCode.toLowerCase() || 
      voice.lang.toLowerCase().startsWith(langCode.toLowerCase() + '-')
    );

    // Fallback: If no exact language match, find similar or default
    if (!matchedVoice && langCode.includes('-')) {
      const baseCode = langCode.split('-')[0];
      matchedVoice = voices.find(voice => 
        voice.lang.toLowerCase().startsWith(baseCode.toLowerCase() + '-')
      );
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    // Set properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      onStart();
    };

    utterance.onend = () => {
      onEnd();
      currentUtterance = null;
    };

    utterance.onerror = (event) => {
      // Don't show toast if it was cancelled manually
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event);
        toast.error('Speech synthesis encountered an error.');
      }
      onEnd();
      currentUtterance = null;
    };

    synth.speak(utterance);

  } catch (error) {
    console.error('TTS speech failed:', error);
    toast.error('Text-to-speech failed.');
    onEnd();
  }
};

/**
 * Stops any active speech synthesis
 */
export const stopSpeaking = () => {
  const synth = window.speechSynthesis;
  if (synth && synth.speaking) {
    synth.cancel();
    currentUtterance = null;
  }
};
