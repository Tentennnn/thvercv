import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ResumeData, Language } from '../types';

declare const jspdf: any;
declare const html2canvas: any;

interface TemplateProps {
    data: ResumeData;
    t: (key: string) => string;
    language: Language;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
        <header className="flex items-center mb-6">
            {data.profile.photo && <img src={data.profile.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{data.profile.name}</h1>
                <h2 className="text-lg text-blue-600 font-semibold">{data.profile.title}</h2>
                <div className="flex text-xs text-gray-600 mt-2 space-x-4">
                    <span>{data.profile.email}</span>
                    <span>{data.profile.phone}</span>
                    <span>{data.profile.website}</span>
                </div>
            </div>
        </header>

        <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Summary</h3>
            <p className="text-gray-700">{data.summary}</p>
        </section>

        <section className="mt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Experience</h3>
            {data.experience.map(exp => (
                <div key={exp.id} className="mb-3">
                    <h4 className="text-md font-semibold text-gray-800">{exp.title}</h4>
                    <div className="flex justify-between text-sm">
                        <p className="text-gray-700">{exp.company}</p>
                        <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                </div>
            ))}
        </section>

        <section className="mt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Education</h3>
            {data.education.map(edu => (
                 <div key={edu.id} className="mb-2">
                    <h4 className="text-md font-semibold text-gray-800">{edu.degree}</h4>
                     <div className="flex justify-between text-sm">
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    </div>
                </div>
            ))}
        </section>

         <section className="mt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{skill.name}</span>
            ))}
            </div>
        </section>
    </div>
);

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="p-6 bg-white dark:bg-gray-900 font-sans text-sm flex">
        <div className="w-1/3 bg-gray-800 text-white p-4">
             {data.profile.photo && <img src={data.profile.photo} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />}
             <h1 className="text-2xl font-bold text-center">{data.profile.name}</h1>
             <h2 className="text-md text-teal-400 font-light text-center mb-4">{data.profile.title}</h2>
             <hr className="border-gray-600 my-4" />
             <p className="text-xs text-center">{data.profile.email}</p>
             <p className="text-xs text-center">{data.profile.phone}</p>
             <p className="text-xs text-center">{data.profile.website}</p>
             <p className="text-xs text-center mt-2">{data.profile.location}</p>
             <hr className="border-gray-600 my-4" />
             <h3 className="text-md font-bold uppercase tracking-wider mb-2">Skills</h3>
             {data.skills.map(skill => (
                <div key={skill.id} className="mb-1">
                    <span className="text-xs">{skill.name}</span>
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                        <div className="bg-teal-400 h-1.5 rounded-full" style={{width: `${skill.level * 20}%`}}></div>
                    </div>
                </div>
            ))}
        </div>
        <div className="w-2/3 p-4 text-gray-800 dark:text-gray-100">
            <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-teal-500 border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">Summary</h3>
                <p className="text-xs">{data.summary}</p>
            </section>
             <section className="mt-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-teal-500 border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">Experience</h3>
                {data.experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <h4 className="text-md font-semibold">{exp.title}</h4>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{exp.description}</p>
                    </div>
                ))}
            </section>
            <section className="mt-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-teal-500 border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">Education</h3>
                {data.education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <h4 className="text-md font-semibold">{edu.degree}</h4>
                         <div className="flex justify-between text-sm">
                            <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    </div>
);


const ResumePreview: React.FC = () => {
    const { resumeData, template, setTemplate, t, language } = useAppContext();
    const resumeRef = React.useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = React.useState(false);

    const handleDownloadPDF = () => {
        const input = resumeRef.current;
        if (!input) return;

        setIsDownloading(true);
        const { jsPDF } = jspdf;
        
        // Temporarily apply light mode for consistent PDF output
        const root = document.documentElement;
        const wasDark = root.classList.contains('dark');
        if(wasDark) root.classList.remove('dark');

        html2canvas(input, { scale: 3, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("resume.pdf");
            setIsDownloading(false);
            if(wasDark) root.classList.add('dark'); // Restore dark mode if it was enabled
        }).catch(() => {
            setIsDownloading(false);
            if(wasDark) root.classList.add('dark');
        });
    };
    
    const handlePrint = () => {
        const input = resumeRef.current;
        if (!input) return;

        const content = input.innerHTML;
        const printWindow = window.open('', '', 'height=800,width=800');
        if (!printWindow) return;

        printWindow.document.write('<html><head><title>Print CV</title>');
        printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
        printWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Kantumruy+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">');
        printWindow.document.write(`<script>tailwind.config = { darkMode: 'class', theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'], khmer: ['Kantumruy Pro', 'sans-serif'] } } } }<\/script>`);
        printWindow.document.write('<style>body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    const templates = {
        classic: <ClassicTemplate data={resumeData} t={t} language={language} />,
        modern: <ModernTemplate data={resumeData} t={t} language={language} />,
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex gap-2">
                    <button onClick={() => setTemplate('classic')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${template === 'classic' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{t('preview.classic')}</button>
                    <button onClick={() => setTemplate('modern')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${template === 'modern' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{t('preview.modern')}</button>
                </div>
                 <div className="flex gap-2">
                    <button onClick={handleDownloadPDF} disabled={isDownloading} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:bg-green-400 transition-colors">
                        {isDownloading ? 'Downloading...' : t('preview.downloadPDF')}
                    </button>
                    <button onClick={handlePrint} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">{t('preview.print')}</button>
                 </div>
            </div>
            <div className="aspect-[210/297] border border-gray-200 dark:border-gray-700 overflow-auto bg-gray-100 dark:bg-gray-900">
                 <div ref={resumeRef} className={language === 'km' ? 'font-khmer' : 'font-sans'}>
                    {templates[template]}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
