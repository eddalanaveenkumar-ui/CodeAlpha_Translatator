import axios from 'axios';

/**
 * Translates text using Google Cloud Translation API
 */
async function translateGoogle(text, source, target, apiKey) {
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const data = {
      q: text,
      target: target,
    };
    
    // If source is specified and is not 'auto', add it
    if (source && source !== 'auto') {
      data.source = source;
    }

    const response = await axios.post(url, data);
    
    if (response.data && response.data.data && response.data.data.translations) {
      return {
        translatedText: response.data.data.translations[0].translatedText,
        detectedSourceLanguage: response.data.data.translations[0].detectedSourceLanguage || source,
        provider: 'Google Cloud Translate'
      };
    }
    throw new Error('Unexpected Google Translate API response format');
  } catch (error) {
    console.error('Google Translate Error:', error.response?.data || error.message);
    throw new Error(`Google API failed: ${error.response?.data?.error?.message || error.message}`);
  }
}

/**
 * Translates text using Microsoft Translator API
 */
async function translateMicrosoft(text, source, target, apiKey, region) {
  try {
    const url = 'https://api.cognitive.microsofttranslator.com/translate';
    const headers = {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Content-Type': 'application/json',
    };
    
    if (region) {
      headers['Ocp-Apim-Subscription-Region'] = region;
    }

    const params = new URLSearchParams();
    params.append('api-version', '3.0');
    params.append('to', target);
    
    if (source && source !== 'auto') {
      params.append('from', source);
    }

    const response = await axios.post(
      `${url}?${params.toString()}`,
      [{ Text: text }],
      { headers }
    );

    if (response.data && response.data[0] && response.data[0].translations) {
      return {
        translatedText: response.data[0].translations[0].text,
        detectedSourceLanguage: response.data[0].detectedLanguage?.language || source,
        provider: 'Microsoft Translator'
      };
    }
    throw new Error('Unexpected Microsoft Translator API response format');
  } catch (error) {
    console.error('Microsoft Translator Error:', error.response?.data || error.message);
    throw new Error(`Microsoft API failed: ${error.response?.data?.[0]?.error?.message || error.message}`);
  }
}

/**
 * Translates text using MyMemory Translation API (Free Fallback)
 */
async function translateMyMemory(text, source, target) {
  try {
    const sourceLang = source === 'auto' ? 'autodetect' : source;
    const langPair = `${sourceLang}|${target}`;
    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
    
    // If user has set an email or key for MyMemory, append to raise limits
    const myMemoryEmail = process.env.MYMEMORY_EMAIL;
    const myMemoryKey = process.env.MYMEMORY_KEY;
    
    if (myMemoryEmail) {
      url += `&de=${encodeURIComponent(myMemoryEmail)}`;
    }
    if (myMemoryKey) {
      url += `&key=${encodeURIComponent(myMemoryKey)}`;
    }
    
    const response = await axios.get(url, { timeout: 8000 });
    
    if (response.data && response.data.responseData) {
      let translatedText = response.data.responseData.translatedText;
      
      // If the MyMemory API returns an error message in responseData.translatedText, throw error
      if (response.data.responseStatus === 403 || translatedText.includes('MYMEMORY WARNING')) {
        throw new Error(response.data.responseDetails || 'MyMemory rate limit or access denied');
      }
      
      // MyMemory returns HTML entities sometimes, decode basic ones if needed
      // but standard response is plain text.
      return {
        translatedText: translatedText,
        detectedSourceLanguage: response.data.matches?.[0]?.segment === text ? response.data.matches?.[0]?.language : (source !== 'auto' ? source : 'en'),
        provider: 'MyMemory Free Translation API (Fallback)'
      };
    }
    throw new Error('Unexpected MyMemory API response format');
  } catch (error) {
    console.warn('MyMemory Fallback Error:', error.message);
    throw error;
  }
}

/**
 * Offline Mock Fallback in case network fails completely
 */
function translateMock(text, source, target) {
  const mockTranslations = {
    'hello': { 'fr': 'Bonjour', 'es': 'Hola', 'de': 'Hallo', 'it': 'Ciao' },
    'thank you': { 'fr': 'Merci', 'es': 'Gracias', 'de': 'Danke', 'it': 'Grazie' },
  };

  const cleanText = text.trim().toLowerCase();
  let translated = '';

  if (mockTranslations[cleanText] && mockTranslations[cleanText][target]) {
    translated = mockTranslations[cleanText][target];
  } else {
    translated = `[Offline Mode: Translated "${text}" from ${source} to ${target}]`;
  }

  return {
    translatedText: translated,
    detectedSourceLanguage: source === 'auto' ? 'en' : source,
    provider: 'Local Offline Mock Service'
  };
}

/**
 * Main Translate Service entrypoint
 */
export async function translateText({ text, source, target }) {
  const googleKey = process.env.GOOGLE_API_KEY;
  const microsoftKey = process.env.MICROSOFT_API_KEY;
  const microsoftRegion = process.env.MICROSOFT_LOCATION;

  // 1. Google API
  if (googleKey) {
    try {
      return await translateGoogle(text, source, target, googleKey);
    } catch (err) {
      console.warn('Google Translation failed, attempting Microsoft or MyMemory fallback...', err.message);
    }
  }

  // 2. Microsoft API
  if (microsoftKey) {
    try {
      return await translateMicrosoft(text, source, target, microsoftKey, microsoftRegion);
    } catch (err) {
      console.warn('Microsoft Translation failed, attempting MyMemory fallback...', err.message);
    }
  }

  // 3. MyMemory API (Free fallback)
  try {
    return await translateMyMemory(text, source, target);
  } catch (err) {
    console.error('MyMemory Translation failed, falling back to Local Mock...', err.message);
    // 4. Ultimate offline/mock fallback
    return translateMock(text, source, target);
  }
}
