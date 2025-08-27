
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SunIcon, MoonIcon, GlobeIcon } from './icons/Icons';

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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('headerTitle')}</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Language"
          >
            <GlobeIcon />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
