
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SunIcon, MoonIcon, CvIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { theme, setTheme, language, setLanguage, t } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'km' : 'en');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CvIcon className="h-8 w-8 text-gray-800 dark:text-white" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('headerTitle')}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Language"
          >
            <span className="font-bold text-sm tracking-wider">{language === 'en' ? 'KH' : 'EN'}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;