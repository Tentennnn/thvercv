
import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

const AppContent: React.FC = () => {
    const { language } = useAppContext();
    return (
        <div className={language === 'km' ? 'font-khmer' : 'font-sans'}>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <ResumeForm />
                    </div>
                    <div className="sticky top-8">
                        <ResumePreview />
                    </div>
                </div>
            </main>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
