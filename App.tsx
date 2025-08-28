
import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
    const { language } = useAppContext();
    return (
        <div className={`flex flex-col min-h-screen ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <TemplateSelector />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <ResumeForm />
                    </div>
                    <div className="sticky top-8">
                        <ResumePreview />
                    </div>
                </div>
            </main>
            <Footer />
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