import React from 'react';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { downloadCount, t } = useAppContext();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          {t('footer.downloads')} <span className="font-bold text-gray-800 dark:text-gray-200">{downloadCount.toLocaleString()}</span>
        </p>
        <p className="text-xs mt-2">
          &copy; {new Date().getFullYear()} Modern CV Builder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
