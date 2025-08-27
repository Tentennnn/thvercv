export interface Skill {
  id: string;
  name: string;
  level: number; // 1 to 5
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  profile: {
    name: string;
    title: string;
    photo: string | null;
    email: string;
    phone: string;
    website: string;
    location: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'km';
export type Template = 'classic' | 'modern' | 'khmer';

export type Action =
  | { type: 'UPDATE_PROFILE'; payload: { field: keyof ResumeData['profile']; value: string } }
  | { type: 'UPDATE_PHOTO'; payload: string | null }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_ITEM'; payload: { section: 'experience' | 'education' | 'skills'; item: any } }
  | { type: 'UPDATE_ITEM'; payload: { section: 'experience' | 'education' | 'skills'; id: string; updates: any } }
  | { type: 'DELETE_ITEM'; payload: { section: 'experience' | 'education' | 'skills'; id: string } };