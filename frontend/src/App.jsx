import React from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';

export const App = () => {
  return (
    <ThemeProvider>
      {/* Dynamic Toast Notifications */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          className: 'font-sans text-sm font-semibold border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg',
          duration: 3000,
          style: {
            padding: '12px 18px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          }
        }}
      />
      <Home />
    </ThemeProvider>
  );
};

export default App;
