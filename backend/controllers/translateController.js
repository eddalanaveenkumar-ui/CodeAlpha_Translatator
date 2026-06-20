import { translateText } from '../services/translator.js';

export async function handleTranslate(req, res) {
  try {
    const { text, source = 'auto', target } = req.body;

    // 1. Validation
    if (!text || text.trim() === '') {
      return res.status(400).json({
        error: 'Text is required',
        message: 'Please enter some text to translate.'
      });
    }

    if (!target || target.trim() === '') {
      return res.status(400).json({
        error: 'Target language is required',
        message: 'Please specify the target language code.'
      });
    }

    // 2. Call service
    const result = await translateText({ text, source, target });

    // 3. Respond
    return res.status(200).json({
      translatedText: result.translatedText,
      detectedSourceLanguage: result.detectedSourceLanguage,
      provider: result.provider
    });

  } catch (error) {
    console.error('Translation Controller Error:', error);
    return res.status(500).json({
      error: 'Translation API Failure',
      message: error.message || 'An error occurred during translation.'
    });
  }
}
