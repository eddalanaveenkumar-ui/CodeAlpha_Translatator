import toast from 'react-hot-toast';

/**
 * Copies text to user clipboard and displays a success toast
 * @param {string} text The text to copy
 * @param {string} label Label describing what was copied (e.g. 'Translation')
 */
export const copyToClipboard = async (text, label = 'Text') => {
  if (!text || text.trim() === '') {
    toast.error('Nothing to copy!');
    return false;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`, {
        icon: '📋',
        style: {
          borderRadius: '12px',
          background: '#334155',
          color: '#fff',
        },
      });
      return true;
    } else {
      // Fallback method for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (success) {
        toast.success(`${label} copied to clipboard!`, {
          icon: '📋',
        });
        return true;
      }
      throw new Error('Copy command failed');
    }
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    toast.error('Failed to copy text.');
    return false;
  }
};
