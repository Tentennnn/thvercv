
import React from 'react';
import { useAppContext } from '../context/AppContext';

const TemplateSelector: React.FC = () => {
    const { template, setTemplate, t } = useAppContext();

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-2 sm:gap-4">
             <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-0">{t('preview.selectTemplate')}:</h3>
            <div className="flex gap-2">
                <button onClick={() => setTemplate('classic')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${template === 'classic' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{t('preview.classic')}</button>
                <button onClick={() => setTemplate('modern')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${template === 'modern' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{t('preview.modern')}</button>
                <button onClick={() => setTemplate('khmer')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${template === 'khmer' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{t('preview.khmer')}</button>
            </div>
        </div>
    );
};

export default TemplateSelector;
