import React, { createContext, useContext, useReducer, useState, useEffect, useCallback } from 'react';
import { ResumeData, Theme, Language, Template, Action } from '../types';
import { translations } from '../lib/i18n';

const initialResumeData: ResumeData = {
  profile: {
    name: 'LIM CHILONG',
    title: 'GRAPHIC DESIGNER',
    photo: null,
    email: 'thver.cv@example.com',
    phone: '+855 123 456 7',
    website: 'tenten.dev',
    location: 'Phnom Penh',
  },
  summary: 'Experienced Frontend Developer with a demonstrated history of working in the computer software industry. Skilled in React, TypeScript, and Tailwind CSS. Strong engineering professional with a Bachelor of Science (B.S.) focused in Computer Science.',
  experience: [
    { id: 'exp1', title: 'Senior Frontend Developer', company: 'Tech Solutions Inc.', startDate: '2020-01', endDate: 'Present', description: 'Led the development of a new customer-facing dashboard using React and TypeScript, improving user engagement by 25%. Collaborated with UX/UI designers to implement responsive and accessible designs.' },
  ],
  education: [
    { id: 'edu1', degree: 'Bachelor of Science in Computer Science', institution: 'State University', startDate: '2014-09', endDate: '2018-05' },
  ],
  skills: [
    { id: 'skill1', name: 'PHOTOSHOP', level: 5 },
    { id: 'skill2', name: 'ILLUSTRATOR', level: 5 },
    { id: 'skill3', name: 'BLEDER', level: 4 },
  ],
  languages: [
    { id: 'lang1', name: 'English', proficiency: 'Fluent' },
    { id: 'lang2', name: 'Khmer', proficiency: 'Native' },
  ],
  interests: [
    { id: 'int1', name: 'Photography' },
    { id: 'int2', name: 'Minimalist Design' },
  ],
};

const resumeReducer = (state: ResumeData, action: Action): ResumeData => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, [action.payload.field]: action.payload.value } };
    case 'UPDATE_PHOTO':
        return { ...state, profile: { ...state.profile, photo: action.payload } };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_ITEM':
      return { ...state, [action.payload.section]: [...state[action.payload.section], action.payload.item] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].map((item: any) =>
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].filter((item: any) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

interface AppContextType {
  resumeData: ResumeData;
  dispatch: React.Dispatch<Action>;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  template: Template;
  setTemplate: (template: Template) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialResumeData);
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('km');
  const [template, setTemplate] = useState<Template>('classic');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) return key;
    }
    return result || key;
  }, [language]);

  return (
    <AppContext.Provider value={{ resumeData, dispatch, theme, setTheme, language, setLanguage, template, setTemplate, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};