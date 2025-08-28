import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Experience, Education, Skill, ResumeData, LanguageItem, Interest } from '../types';
import { PlusIcon, TrashIcon, ChevronDownIcon, PhotoIcon, StarIcon, MagicIcon, SpinnerIcon } from './icons/Icons';
import { GoogleGenAI } from "@google/genai";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children, actions }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-gray-800 dark:text-gray-100"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <div className="flex items-center gap-4">
                    {actions}
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            {isOpen && <div className="pb-4 space-y-4">{children}</div>}
        </div>
    );
};

const FormInput: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}> = ({ label, name, value, onChange, placeholder = '', type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
    </div>
);

const FormTextarea: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    srOnlyLabel?: boolean;
}> = ({ label, name, value, onChange, placeholder = '', rows = 4, srOnlyLabel = false }) => (
    <div>
        <label htmlFor={name} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${srOnlyLabel ? 'sr-only' : ''}`}>{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            aria-label={srOnlyLabel ? label : undefined}
        />
    </div>
);


const ResumeForm: React.FC = () => {
  const { resumeData, dispatch, t } = useAppContext();
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { field: e.target.name as keyof ResumeData['profile'], value: e.target.value },
    });
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            dispatch({ type: 'UPDATE_PHOTO', payload: event.target?.result as string });
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value });
  };
  
  const handleItemChange = (section: 'experience' | 'education' | 'skills' | 'languages' | 'interests', id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'UPDATE_ITEM', payload: { section, id, updates: { [e.target.name]: e.target.value } } });
  };
  
  const handleSkillLevelChange = (id: string, level: number) => {
      dispatch({ type: 'UPDATE_ITEM', payload: { section: 'skills', id, updates: { level } } });
  };

  const addItem = (section: 'experience' | 'education' | 'skills' | 'languages' | 'interests') => {
    const newItem = { id: new Date().toISOString() };
    if (section === 'experience') (newItem as Experience) = { ...newItem, title: '', company: '', startDate: '', endDate: '', description: '' };
    if (section === 'education') (newItem as Education) = { ...newItem, degree: '', institution: '', startDate: '', endDate: '' };
    if (section === 'skills') (newItem as Skill) = { ...newItem, name: '', level: 3 };
    if (section === 'languages') (newItem as LanguageItem) = { ...newItem, name: '', proficiency: '' };
    if (section === 'interests') (newItem as Interest) = { ...newItem, name: '' };
    dispatch({ type: 'ADD_ITEM', payload: { section, item: newItem } });
  };

  const deleteItem = (section: 'experience' | 'education' | 'skills' | 'languages' | 'interests', id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: { section, id } });
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
        if (!process.env.API_KEY) {
            alert('API Key is not configured. Please set the API_KEY environment variable.');
            setIsGeneratingSummary(false);
            return;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const experienceText = resumeData.experience.map(e => `${e.title} at ${e.company}`).join(', ');
        const skillsText = resumeData.skills.map(s => s.name).join(', ');

        const prompt = `Based on the following information, write a compelling and concise professional summary in about 3-4 sentences.
        - Full Name: ${resumeData.profile.name}
        - Professional Title: ${resumeData.profile.title}
        - Experience: ${experienceText}
        - Skills: ${skillsText}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert resume writer. Generate a professional summary that is concise, impactful, and tailored to the user's provided details. The tone should be professional and confident. Output only the summary text, with no extra formatting or introductory phrases.",
            },
        });
        
        const summaryText = response.text;
        
        if (summaryText) {
            dispatch({ type: 'UPDATE_SUMMARY', payload: summaryText.trim() });
        } else {
            throw new Error("Failed to generate summary. The response was empty.");
        }

    } catch (error) {
        console.error("Error generating summary:", error);
        alert("Sorry, there was an error generating the summary. Please try again.");
    } finally {
        setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-6">
      <AccordionSection title={t('form.personalInfo')}>
        <div className="md:col-span-2 flex items-center gap-4 mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                {resumeData.profile.photo ? (
                     <img src={resumeData.profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <PhotoIcon className="w-12 h-12 text-gray-400" />
                )}
            </div>
             <label htmlFor="photo-upload" className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center">
                {resumeData.profile.photo ? t('form.changePhoto') : t('form.uploadPhoto')}
            </label>
            <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label={t('form.fullName')} name="name" value={resumeData.profile.name} onChange={handleProfileChange} placeholder={t('placeholders.name')} />
            <FormInput label={t('form.professionalTitle')} name="title" value={resumeData.profile.title} onChange={handleProfileChange} placeholder={t('placeholders.title')} />
            <FormInput label={t('form.email')} name="email" value={resumeData.profile.email} onChange={handleProfileChange} placeholder={t('placeholders.email')} type="email" />
            <FormInput label={t('form.phone')} name="phone" value={resumeData.profile.phone} onChange={handleProfileChange} placeholder={t('placeholders.phone')} type="tel" />
            <FormInput label={t('form.website')} name="website" value={resumeData.profile.website} onChange={handleProfileChange} placeholder={t('placeholders.website')} type="url" />
            <FormInput label={t('form.location')} name="location" value={resumeData.profile.location} onChange={handleProfileChange} placeholder={t('placeholders.location')} />
        </div>
      </AccordionSection>

      <AccordionSection
        title={t('form.summary')}
        actions={
            <button
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Generate summary with AI"
            >
                {isGeneratingSummary ? (
                    <>
                        <SpinnerIcon className="w-4 h-4" />
                        Generating...
                    </>
                ) : (
                    <>
                        <MagicIcon />
                        AI Generate
                    </>
                )}
            </button>
        }
      >
          <FormTextarea 
            label={t('form.summary')}
            srOnlyLabel={true}
            name="summary" 
            value={resumeData.summary}
            onChange={handleSummaryChange} 
            placeholder={t('form.summaryPlaceholder')} 
            rows={5}
          />
      </AccordionSection>
      
      <AccordionSection title={t('form.experience')}>
          {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
                  <button onClick={() => deleteItem('experience', exp.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors" aria-label={`Delete experience at ${exp.company}`}>
                      <TrashIcon />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label={t('form.jobTitle')} name="title" value={exp.title} onChange={(e) => handleItemChange('experience', exp.id, e)} placeholder={t('placeholders.jobTitle')} />
                      <FormInput label={t('form.company')} name="company" value={exp.company} onChange={(e) => handleItemChange('experience', exp.id, e)} placeholder={t('placeholders.company')} />
                      <FormInput label={t('form.startDate')} name="startDate" value={exp.startDate} onChange={(e) => handleItemChange('experience', exp.id, e)} type="month" />
                      <FormInput label={t('form.endDate')} name="endDate" value={exp.endDate} onChange={(e) => handleItemChange('experience', exp.id, e)} type="month" />
                  </div>
                  <FormTextarea label={t('form.description')} srOnlyLabel={true} name="description" value={exp.description} onChange={(e) => handleItemChange('experience', exp.id, e)} placeholder={t('placeholders.description')} />
              </div>
          ))}
          <button onClick={() => addItem('experience')} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-2">
              <PlusIcon /> {t('form.addExperience')}
          </button>
      </AccordionSection>

      <AccordionSection title={t('form.education')}>
          {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
                   <button onClick={() => deleteItem('education', edu.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors" aria-label={`Delete education at ${edu.institution}`}>
                      <TrashIcon />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label={t('form.degree')} name="degree" value={edu.degree} onChange={(e) => handleItemChange('education', edu.id, e)} placeholder={t('placeholders.degree')} />
                      <FormInput label={t('form.institution')} name="institution" value={edu.institution} onChange={(e) => handleItemChange('education', edu.id, e)} placeholder={t('placeholders.institution')} />
                      <FormInput label={t('form.startDate')} name="startDate" value={edu.startDate} onChange={(e) => handleItemChange('education', edu.id, e)} type="month" />
                      <FormInput label={t('form.endDate')} name="endDate" value={edu.endDate} onChange={(e) => handleItemChange('education', edu.id, e)} type="month" />
                  </div>
              </div>
          ))}
           <button onClick={() => addItem('education')} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-2">
              <PlusIcon /> {t('form.addEducation')}
          </button>
      </AccordionSection>

       <AccordionSection title={t('form.skills')}>
          {resumeData.skills.map((skill) => (
              <div key={skill.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col sm:flex-row items-start sm:items-end sm:justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex-grow w-full sm:w-auto">
                      <FormInput label={t('form.skillName')} name="name" value={skill.name} onChange={(e) => handleItemChange('skills', skill.id, e)} placeholder={t('placeholders.skill')} />
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.skillLevel')}</label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(level => (
                                <button key={level} onClick={() => handleSkillLevelChange(skill.id, level)} aria-label={`Set skill level to ${level}`}>
                                    <StarIcon className={`w-6 h-6 transition-colors ${level <= skill.level ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'}`} />
                                </button>
                            ))}
                        </div>
                      </div>
                      <button onClick={() => deleteItem('skills', skill.id)} className="p-1 text-gray-400 hover:text-red-500 sm:ml-4" aria-label={`Delete skill ${skill.name}`}>
                          <TrashIcon />
                      </button>
                  </div>
              </div>
          ))}
           <button onClick={() => addItem('skills')} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-2">
              <PlusIcon /> {t('form.addSkill')}
          </button>
      </AccordionSection>
      <AccordionSection title={t('form.languages')}>
        {resumeData.languages.map((lang) => (
          <div key={lang.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 relative bg-gray-50 dark:bg-gray-800/50">
            <button onClick={() => deleteItem('languages', lang.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors" aria-label={`Delete language ${lang.name}`}>
              <TrashIcon />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label={t('form.languageName')} name="name" value={lang.name} onChange={(e) => handleItemChange('languages', lang.id, e)} placeholder={t('placeholders.language')} />
              <FormInput label={t('form.proficiency')} name="proficiency" value={lang.proficiency} onChange={(e) => handleItemChange('languages', lang.id, e)} placeholder={t('placeholders.proficiency')} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('languages')} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-2">
          <PlusIcon /> {t('form.addLanguage')}
        </button>
      </AccordionSection>

      <AccordionSection title={t('form.interests')}>
        {resumeData.interests.map((interest) => (
          <div key={interest.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-end justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex-grow">
              <FormInput label={t('form.interestName')} name="name" value={interest.name} onChange={(e) => handleItemChange('interests', interest.id, e)} placeholder={t('placeholders.interest')} />
            </div>
            <button onClick={() => deleteItem('interests', interest.id)} className="p-1 text-gray-400 hover:text-red-500" aria-label={`Delete interest ${interest.name}`}>
              <TrashIcon />
            </button>
          </div>
        ))}
        <button onClick={() => addItem('interests')} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-2">
          <PlusIcon /> {t('form.addInterest')}
        </button>
      </AccordionSection>
    </div>
  );
};

export default ResumeForm;