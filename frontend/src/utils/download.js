import toast from 'react-hot-toast';

/**
 * Downloads text as a standard .txt file
 * @param {string} text Text content to export
 * @param {string} sourceLang Source language code
 * @param {string} targetLang Target language code
 */
export const downloadTranslation = (text, sourceLang = 'auto', targetLang) => {
  if (!text || text.trim() === '') {
    toast.error('Nothing to download!');
    return;
  }

  try {
    const filename = `translation-${sourceLang}-to-${targetLang}.txt`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    
    // Check if browser supports MS Save Blob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      toast.success('Downloaded translation file!');
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Translation downloaded successfully!', {
      icon: '💾',
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
      },
    });
  } catch (error) {
    console.error('File download failed:', error);
    toast.error('Failed to download translation file.');
  }
};
